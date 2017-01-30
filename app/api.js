const harvest = require('harvesterjs');
const Joi = require('joi');

const options = {
  adapter: 'mongodb',
  connectionString: process.env.MONGODB_URL,
  db: 'blog',
  inflect: true,
  oplogConnectionString: (process.env.OPLOG_MONGODB_URL || "mongodb://db:27017/local") + '?slaveOk=true',
};

// define 2 resources
// posts and comments
// analogue to the examples used on jsonapi.org
const harvestApp = harvest(options)
  .resource('post', {
    title: Joi.string()
  })
  .resource('comment', {
    body: Joi.string(),
    post: 'post'
  });

module.exports = harvestApp;
