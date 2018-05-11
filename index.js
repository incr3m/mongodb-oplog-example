const MongoOplog = require('mongo-oplog')

const oplog = MongoOplog('mongodb://127.0.0.1:27017/local')
const RedisSMQ = require("rsmq");

const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );


oplog.tail();
 
// oplog.on('op', data => {
//   console.log(data);
// });
 
oplog.on('insert', doc => {
  console.log(doc);
});
 
oplog.on('update', doc => {
  console.log(doc);
});
 
oplog.on('delete', doc => {
  console.log(doc.o._id);
});
 
oplog.on('error', error => {
  console.log('error');
  console.log(error);
  process.exit(1);
});
 
oplog.on('end', () => {
  console.log('Stream ended');
});
 
// oplog.stop(() => {
//   console.log('server stopped');
// });