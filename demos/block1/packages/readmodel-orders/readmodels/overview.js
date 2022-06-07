import fetch from 'isomorphic-fetch';
import convert from 'xml-js';

export default {
  projections: {
    CUSTOMER_CREATED: ({ storage }, { aggregateId, payload: { name } }) =>
      storage.insertOne('customers', { id: aggregateId, name }),

    ORDER_CREATED: (
      { storage, sideEffects, commands },
      { aggregateId, payload: { customerId, text, value } }
    ) =>
      Promise.all([
        storage
          .find('customers', { id: customerId })
          .project({ name: 1 })
          .toArray()
          .then(([{ name }]) => name)
          .then(name =>
            storage.insertOne('overview', {
              id: aggregateId,
              customerId,
              text,
              value,
              customerName: name,
            })
          ),
        sideEffects.schedule(
          () =>
            fetch(
              'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
            )
              .then(res => res.text())
              .then(res => convert.xml2js(res))
              .then(res => {
                const cube = res.elements[0].elements.find(
                  e => e.name === 'Cube'
                ).elements[0];
                return {
                  time: cube.attributes.time,
                  usdRate: cube.elements.find(
                    e => e.attributes.currency === 'USD'
                  ).attributes.rate,
                };
              })
              .then(({ time, usdRate }) =>
                commands.execute({
                  aggregateName: 'order',
                  aggregateId,
                  command: 'ADD_USD_RATE_AND_VALUE',
                  payload: { time, usdRate, usdValue: value * usdRate },
                })
              ),
          { name: 'Add USD rate and value' }
        ),
      ]),

    ORDER_USD_RATE_AND_VALUE_ADDED: (
      { storage },
      { aggregateId, payload: { time, usdRate, usdValue } }
    ) =>
      Promise.resolve({
        usdInfo: {
          exchangeRateDate: time,
          exchangeRate: usdRate,
          value: usdValue,
        },
      }).then(updateItem =>
        storage
          .updateOne(
            'overview',
            { id: aggregateId },
            {
              $set: updateItem,
            }
          )
          .then(() => updateItem)
      ),
  },

  resolvers: {
    all: storage => storage.find('overview', {}).project({ _id: 0 }).toArray(),
    customerById: (storage, { id }) =>
      storage.find('customers', { id }).project({ _id: 0 }).toArray(),
  },
};
