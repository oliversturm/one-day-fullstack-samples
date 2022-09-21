module.exports = {
  apps: [
    {
      name: 'command-processor',
      script: 'index.js',
      cwd: './labs/lab3/final/packages/command-processor',
      env: {
        FORCE_COLOR: 1,
        LOG_LEVEL: 'trace',
        EVENT_STORE_MONGODB_URL_SCHEME: 'mongodb',
        EVENT_STORE_MONGODB_SERVER: '127.0.0.1',
        EVENT_STORE_MONGODB_URL_PATH: '',
        EVENT_STORE_MONGODB_USER: '',
        EVENT_STORE_MONGODB_PWD: '',
        EVENT_STORE_DATABASE: 'events',
        EVENT_STORE_COLLECTION: 'events',
      },
    },
    {
      name: 'readmodel-customers',
      script: 'index.js',
      cwd: './labs/lab3/final/packages/readmodel-customers',
      env: {
        FORCE_COLOR: 1,
        LOG_LEVEL: 'trace',
        EVENT_STORE_MONGODB_URL_SCHEME: 'mongodb',
        EVENT_STORE_MONGODB_SERVER: '127.0.0.1',
        EVENT_STORE_MONGODB_URL_PATH: '',
        EVENT_STORE_MONGODB_USER: '',
        EVENT_STORE_MONGODB_PWD: '',
        STORE_DATABASE: 'readmodel-customers',
        API_PORT: 3003,
        COMMAND_ENDPOINT: 'http://127.0.0.1:3001/api/command',
      },
    },
    {
      name: 'readmodel-orders',
      script: 'index.js',
      cwd: './labs/lab3/final/packages/readmodel-orders',
      env: {
        FORCE_COLOR: 1,
        LOG_LEVEL: 'trace',
        EVENT_STORE_MONGODB_URL_SCHEME: 'mongodb',
        EVENT_STORE_MONGODB_SERVER: '127.0.0.1',
        EVENT_STORE_MONGODB_URL_PATH: '',
        EVENT_STORE_MONGODB_USER: '',
        EVENT_STORE_MONGODB_PWD: '',
        STORE_DATABASE: 'readmodel-orders',
        API_PORT: 3005,
        COMMAND_ENDPOINT: 'http://127.0.0.1:3001/api/command',
      },
    },
    {
      name: 'frontend-react',
      cwd: '.',
      script: 'node_modules/vite/bin/vite.js',
      args: 'serve labs/lab3/final/packages/frontend-react',
    },
    {
      name: 'frontend-svelte',
      cwd: '.',
      script: 'node_modules/cross-env/src/bin/cross-env.js',
      args: 'PREFIX=labs/lab3/final CACHE_POSTFIX=labs-lab3-final svelte-kit dev',
    },
  ],
};
