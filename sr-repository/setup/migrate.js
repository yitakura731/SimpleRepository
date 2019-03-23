const config = require('config');
const mongoClient = require('mongodb').MongoClient;

const url = config.get('dbServerURL');
const name = config.get('dbName');

async function createCollection(dbo) {
  await dbo.createCollection('documents');
  await dbo.createCollection('tags');
  await dbo.createCollection('spaces');
  return Promise.resolve();
}

console.log('start migration');

mongoClient
  .connect(url, { useNewUrlParser: true })
  .then(db => {
    const dbo = db.db(name);
    createCollection(dbo).then(() => {
      db.close();
      console.log('end migration');
    });
  })
  .catch(err => {
    console.log(err);
  });
