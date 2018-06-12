/******************************************************************************
 *  Purpose         : Creates a connection with database using mongoose.
 *
 *  @description
 *
 *  @file           : connection.js
 *  @overview       : Connection class creates a connection with database using mongoose.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 ******************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} mongoose class instance of the mongoose
 * @var {Class} config class instance
 */
const mongoose = require('mongoose');
const config = require ('../secret/config');

/**
* @function connection creates a connection with mongodb
*/
function connection() {
  return mongoose.connect(config.database);

  var db = mongoose.connection;
  db.once('open',() => {
    console.log('Connected to database');
  });
  db.on('error',console.error.bind(console,'connection error'));
}

module.exports = {
  createConnection : connection
};
