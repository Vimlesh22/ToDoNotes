const mongoose = require('mongoose');
const config = require ('../secret/config');

module.exports = {
  createConnection : connection
};

function connection() {
  return mongoose.connect(config.database);

  var db = mongoose.connection;
  db.once('open',() => {
    console.log('Connected to database');
  });
  db.on('error',console.error.bind(console,'connection error'));
}
