/******************************************************************************
 *  Purpose         : Defines controller class for authentication of user using token.
 *
 *  @description
 *
 *  @file           : authController.js
 *  @overview       : authController class will basically check whether the user is authorized or not.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 ******************************************************************************/
/**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} jwt class instance of the jsonwebtoken
 */
const jwt = require('jsonwebtoken');
const config = require ('../secret/config');

function AuthController() {

}
/**
 * @description Prototype property adding the property functions for AuthControllerClass,.
 * @method jwt_token_filter() - Verifies the token provided by the user and passes the control to next middleware
 */
AuthController.prototype.jwt_token_filter =  (req,res,next) => {
  if(req.url.indexOf("login") === -1 && req.url.indexOf("signup") === -1){
    try{
      if(!req.headers.authorization){
        throw new Error('Token not provided');
      }else {
        var token = req.body.token || req.headers['authorization'];
        if(token === undefined ){
          throw new Error('Token undefined');
        }else if(token.length === 0){
          throw new Error('Token is empty');
        }
        var decoded = jwt.verify(token,config.secret,function(err, result) {
          var auth = {
            _id : result._id,
          };
          req.user = auth ;
        });
      }
    }catch(error)
    {
      return next(error);
    }
  }
  return next();
};

module.exports = new AuthController();
