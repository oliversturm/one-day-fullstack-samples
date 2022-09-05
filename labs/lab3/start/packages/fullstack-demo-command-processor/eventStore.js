import { MongoClient } from 'mongodb';

import { getLogger } from '../fullstack-demo-logger/index.js';

const log = getLogger('CmdProc/ES');

const replay = dbContext => cmdProcContext =>
  Promise.all([
    cmdProcContext.aggregateStore.startReplay(),
    cmdProcContext.eventBus.publishReplayState(true),
  ])
    .then(() =>
      dbContext.collection
        .find({}, { sort: { timestamp: 1 } })
        .forEach(event => {
          if (event) {
            return Promise.all([
              cmdProcContext.aggregateStore.applyAggregateProjection(event),
              cmdProcContext.eventBus.publishEvent(event),
            ]);
          } else return false;
        })
    )
    .then(() =>
      Promise.all([
        cmdProcContext.aggregateStore.endReplay(),
        cmdProcContext.eventBus.publishReplayState(false),
      ])
    );

const createEventStore = () => {
  // 1. Consider a complete URL in
  //    process.env.EVENT_STORE_MONGODB_URL
  // 2. If the parts USER, PWD, URL_SCHEME, SERVER and
  //    URL_PATH (all with EVENT_STORE_MONGODB_ prefix)
  //    are available, put together the URL like
  //    SCHEME://USER:PWD@SERVER/PATH
  // 3. Fall back to 'mongodb://127.0.0.1:27017'
  const url = process.env.EVENT_STORE_MONGODB_URL
    ? process.env.EVENT_STORE_MONGODB_URL
    : process.env.EVENT_STORE_MONGODB_USER &&
      process.env.EVENT_STORE_MONGODB_PWD &&
      process.env.EVENT_STORE_MONGODB_URL_SCHEME &&
      process.env.EVENT_STORE_MONGODB_SERVER &&
      process.env.EVENT_STORE_MONGODB_URL_PATH
    ? `${process.env.EVENT_STORE_MONGODB_URL_SCHEME}://${process.env.EVENT_STORE_MONGODB_USER}:${process.env.EVENT_STORE_MONGODB_PWD}@${process.env.EVENT_STORE_MONGODB_SERVER}/${process.env.EVENT_STORE_MONGODB_URL_PATH}`
    : 'mongodb://127.0.0.1:27017';

  // Keep location separate for logging, so that the password
  // doesn't get into the log.
  const logLocation = process.env.EVENT_STORE_MONGODB_USER
    ? process.env.EVENT_STORE_MONGODB_SERVER
    : url;

  const database = process.env.EVENT_STORE_DATABASE || 'events';
  const collection = process.env.EVENT_STORE_COLLECTION || 'events';

  return MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch(err => {
      log.error(`Can't connect to MongoDB at ${logLocation}: ${err}`);
    })
    .then(client => ({ client, db: client.db(database) }))
    .then(dbContext => ({
      ...dbContext,
      collection: dbContext.db.collection(collection),
    }))
    .then(dbContext => ({
      addEvent: event =>
        dbContext.collection
          .insertOne(event)
          .catch(err => {
            log.error(`Can't insert event ${event}: ${err}`);
          })
          .then(() => {
            // Questionable mongodb behavior: insertOne mutates
            // the source object to add the mongodb _id property.
            // We want to publish the event object later, so
            // mongodb artefacts are not wanted here.
            delete event._id;
            return event;
          }),
      close: () => dbContext.client.close(),
      replay: replay(dbContext),
    }));
};

export { createEventStore };
