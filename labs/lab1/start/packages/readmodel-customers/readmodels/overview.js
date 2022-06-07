export default {
  projections: {
    CUSTOMER_CREATED: ({ storage }, { aggregateId, payload: { name } }) =>
      storage.insertOne('overview', { id: aggregateId, name }),

    CUSTOMER_UPDATED: ({ storage }, { aggregateId, payload: { name } }) =>
      storage.updateOne('overview', { id: aggregateId }, { $set: { name } }),
  },

  resolvers: {
    all: storage => storage.find('overview', {}).project({ _id: 0 }).toArray(),
  },
};
