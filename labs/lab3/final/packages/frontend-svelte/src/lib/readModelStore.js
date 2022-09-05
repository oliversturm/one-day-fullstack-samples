import { readable } from 'svelte/store';

// Exactly the same function used in the React project
const query =
  endpoint =>
  (readModelName, resolverName, params = {}) => {
    const url = new URL(`/query/${readModelName}/${resolverName}`, endpoint);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Fetch error: ${res.status}/${res.statusText}`);
        }
        return res;
      })
      .then(res => res.json())
      .catch(err => {
        console.error(
          `Can't query ${url} with params ${JSON.stringify(params)}: ${err}`
        );
      });
  };

const createData = data => ({
  data,
  isEmpty: !data || data.length === 0,
  singleItem: data.length === 1 ? data[0] : undefined,
});

export const readModelStore = (
  endpointName,
  endpoint,
  readModelName,
  resolverName,
  params = {}
) => {
  const store = readable({ data: [], isEmpty: true }, set => {
    query(endpoint)(readModelName, resolverName, params).then(loadedData => {
      // console.log(
      //   `Read model '${readModelName}' on resolver '${resolverName}' for endpoint '${endpoint}' ('${endpointName}') used params <${JSON.stringify(
      //     params
      //   )}> and loaded data`,
      //   loadedData
      // );
      let data = loadedData;
      set(createData(data));
    });
  });
  return store;
};
