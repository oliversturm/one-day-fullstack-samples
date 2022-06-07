// Check environment vars first - that can cover certain local
// startup scenarios, but also CodeSandbox with its secrets.
let { MONGODB_USER, MONGODB_PWD } = process.env;

// Try to load a local file next. This is excluded from git
// in this project so can be used safely enough to store
// auth details locally.
if (!MONGODB_USER || !MONGODB_PWD) {
  try {
    const authInfo = require('./.user-auth.json');
    MONGODB_USER = authInfo.MONGODB_USER;
    MONGODB_PWD = authInfo.MONGODB_PWD;
  } catch {
    // We assume that this happens because there's no .user-auth.json
    //  - no special handling required.
  }
}

// Found auth details, move on
if (MONGODB_USER && MONGODB_PWD) {
  module.exports = {
    apps: [
      {
        name: 'command-processor',
        script: 'index.js',
        cwd: './labs/lab1/start/packages/command-processor',
        env: {
          FORCE_COLOR: 1,
          LOG_LEVEL: 'trace',
          EVENT_STORE_MONGODB_URL_SCHEME: 'mongodb+srv',
          EVENT_STORE_MONGODB_SERVER: 'cluster0.mejvj0u.mongodb.net',
          EVENT_STORE_MONGODB_URL_PATH: '?retryWrites=true&w=majority',
          EVENT_STORE_MONGODB_USER: MONGODB_USER,
          EVENT_STORE_MONGODB_PWD: MONGODB_PWD,
          EVENT_STORE_DATABASE: 'events',
          EVENT_STORE_COLLECTION: 'events',
        },
      },
      {
        name: 'readmodel-customers',
        script: 'index.js',
        cwd: './labs/lab1/start/packages/readmodel-customers',
        env: {
          FORCE_COLOR: 1,
          LOG_LEVEL: 'trace',
          STORE_MONGODB_URL_SCHEME: 'mongodb+srv',
          STORE_MONGODB_SERVER: 'cluster0.mejvj0u.mongodb.net',
          STORE_MONGODB_URL_PATH: '?retryWrites=true&w=majority',
          STORE_MONGODB_USER: MONGODB_USER,
          STORE_MONGODB_PWD: MONGODB_PWD,
          STORE_DATABASE: 'readmodel-customers',
          API_PORT: 3003,
          COMMAND_ENDPOINT: 'http://127.0.0.1:3001/api/command',
        },
      },
      {
        name: 'readmodel-orders',
        script: 'index.js',
        cwd: './labs/lab1/start/packages/readmodel-orders',
        env: {
          FORCE_COLOR: 1,
          LOG_LEVEL: 'trace',
          STORE_MONGODB_URL_SCHEME: 'mongodb+srv',
          STORE_MONGODB_SERVER: 'cluster0.mejvj0u.mongodb.net',
          STORE_MONGODB_URL_PATH: '?retryWrites=true&w=majority',
          STORE_MONGODB_USER: MONGODB_USER,
          STORE_MONGODB_PWD: MONGODB_PWD,
          STORE_DATABASE: 'readmodel-orders',
          API_PORT: 3005,
          COMMAND_ENDPOINT: 'http://127.0.0.1:3001/api/command',
        },
      },
    ],
  };
} else {
  // No auth details, complain.
  console.error("Can't find MONGODB_USER and/or MONGODB_PWD auth info.");
}
