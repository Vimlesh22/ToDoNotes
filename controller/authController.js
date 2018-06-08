const config = require ('../secret/config');
const jwt = require('jsonwebtoken');
function AuthController() {

}
AuthController.prototype.jwt_token_filter = function (req,res,next) {
if(!req.headers.authorization && ( req.url.indexOf("login") === -1 && req.url.indexOf("signup") === -1 )){
  var token = req.body.token || req.headers['x-access-token'];
  try{
  var encode = jwt.verify(token,config.secret);
  }catch(error)
  {
    res.send({
      error : error
    });
  }
}
next();
};

module.exports = new AuthController();
