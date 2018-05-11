const MongoOplogReader = require('mongo-oplog-reader');
const redis = require('redis');

const redisClient = redis.createClient();

const connectionStrings = [
  'mongodb://127.0.0.1:27017/local'
];

const reader = new MongoOplogReader({ 
  redisClient,
  workersPerOplog: 1 // total # of redundant workers per oplog (respected across all processes)
});

reader.setConnectionStrings(connectionStrings);

reader.onEvent(data => {
  // return a promise to apply backpressure on the oplog stream to prevent a 
  // build-up of in-memory stream buffering while performing slower async operations
  console.log('data')//TRACE
  console.log(data)//TRACE
});
reader.start();
