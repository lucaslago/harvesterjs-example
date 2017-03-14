const harvest = require('harvesterjs');
const Joi = require('joi');

const options = {
  adapter: 'mongodb',
  connectionString: "mongodb://mongodb1",
  db: 'blog',
  inflect: true,
  oplogConnectionString: (process.env.OPLOG_MONGODB_URL || "mongodb://mongodb1:27017") + '?slaveOk=true',
};

console.log('mongodb://mongodb1:27017' + '?slaveOk=true');

// define 2 resources
// posts and comments
// analogue to the examples used on jsonapi.org
const harvestApp = harvest(options)
  .resource('post', {
    title: Joi.string()
  })
  .onChange({
    insert: (id) => {
      console.log(`inserted: ${id}`);
    },
    update: (id) => {
      console.log(`updated: ${id}`);
    },
    delete: (id) => {
      console.log(`deleted: ${id}`);
    }
  })
  .resource('comment', {
    body: Joi.string(),
    post: 'post'
  });

module.exports = harvestApp;
