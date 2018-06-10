/******************************************************************************
 *  Execution       :   1. default node         cmd> node server.js 
 *                      2. if nodemon installed cmd> nodemon server.js
 * 
 *  Purpose         : Defines all the apis required for ToDo notes application along with signup and signin apis.
 * 
 *  @description    
 * 
 *  @file           : server.js
 *  @overview       : server file creates a connection on port 3030 for the application to run on localhost.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 ******************************************************************************/

/**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} express class instance of the express
 * @var {Class} morgan class instance of the morgan
 * @var {Class} cors class instance of the cors
 * @var {Class} bodyParser class instance of the body-parser
 * @var {Class} expressValidator class instance of the express-validator
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const model = require('./model/connection');

const app = express();
/**
 * @description Constant Variable is declared to use to define PORT number for the connection.
 * @var {integer} PORT 
 */
const PORT = process.env.PORT || 3030 ;
/**
 * @description middleware added to support cross origin platform sharing.
 */
app.use(cors());
/**
 * @description middleware added to parse the data coming from url request.
 */
app.use('/api',bodyParser.urlencoded({extended : true}));
app.use('/api',bodyParser.json());
/**
 * @description middleware added to log result of the operation on the console using morgan module.
 */
app.use(morgan('dev'));
/**
 * @description middleware added to validate data coming from request using express validator.
 */
app.use(expressValidator());
/**
 * @description middleware added to delegate all th routes to routes folder  to handle incoming request.
 */
app.use('/api',routes);
/**
 * @description creating connection on PORT 3030.
 */
app.listen(PORT, () => {
  model.createConnection();
  console.log('Listening on Port '+PORT);
});
