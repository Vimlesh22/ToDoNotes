const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const model = require('./model/connection');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3030 ;
app.use(cors());
app.use('/api',bodyParser.urlencoded({extended : true}));
app.use('/api',bodyParser.json());
app.use(morgan('dev'));
var expressValidator = require('express-validator');
app.use(expressValidator())
app.use('/api',routes);
app.listen(PORT, () => {
  model.createConnection();
  console.log('Listening on Port'+PORT);
});
