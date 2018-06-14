const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const model = require('./model/connection');
const passport = require('passport');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3030 ;
app.use(cors());

app.use('/api',bodyParser.urlencoded({extended : true}));
app.use('/api',bodyParser.json());
app.use(morgan('dev'));
var expressValidator = require('express-validator');
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',routes);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
      res.status(404).json({
        message: err.message,
        success : false
      })
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("hhhh",err);
    res.status(err.status || 500);

          res.status(404).json({
            message: err.message,
            success : false
          })
});

app.listen(PORT, () => {
  model.createConnection();
  console.log('Listening on Port'+PORT);
});
