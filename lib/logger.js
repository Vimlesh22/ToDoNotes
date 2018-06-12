/******************************************************************************
 *  Purpose         : Defines Logger for tracing the execution details of the application.
 *
 *  @description
 *
 *  @file           : logger.js
 *  @overview       : logger will log all the details regarding execution of the application.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 18-05-2018
 *
 ******************************************************************************/

 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} winston class instance of the winston
 */
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;
