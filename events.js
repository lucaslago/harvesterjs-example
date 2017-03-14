const harvestApp = require('./app/api.js');

// initiate the oplog eventsReader with the Mongodb oplog url and start tailing
harvestApp.eventsReader("mongodb://mongodb1:27017/local?slaveOk=true")
  .then(EventsReader => {
    console.log('start tailing the oplog');
    new EventsReader().tail();
  })
  .catch(e => console.log(e));
