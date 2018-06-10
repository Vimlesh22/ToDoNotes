/**********************************************************************************************************************
 *  Purpose         : Handing of the request coming from the clients regarding login,register and forget password.
 * 
 *  @description    
 * 
 *  @file           : userController.js
 *  @overview       : UserController class delegates the request from client from signup,login and forgetpassword.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 18-05-2018
 *
 **********************************************************************************************************************/
/**
*@description loads all the depencies requied for the user controller class including express validator
*/
const userService = require('../service/userService');
const expressValidator = require('express-validator');

function UserController(){

}

/**
 * @description Prototype property adding the property functions.
 * 
 * @method signup() - Registers the new user for ToDoNotes application
 */
UserController.prototype.signup = (req,res,next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  req.checkBody('username', 'username is required.').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is must be a valid email').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
     res.status(400).send({ "Error": errors });
     return;
   }
   else {
          userService.signupService(username,email,password,(err,result) => {
           if(err){
             res.status(500).json({
               error : err
             });
           }else {
             res.status(200).json({
               result : result
             });
           }
         });
   }

};
/**
 * @description Prototype property adding the property functions.
 * 
 * @method login() - Logins already registered user for ToDoNotes application
 */
UserController.prototype.login = (req,res,next) => {
  var email = req.body.email;
  var password = req.body.password;
  req.checkBody('email','Email is Required').notEmpty();
  req.checkBody('password','Password is Required').notEmpty();
  var error = req.validationErrors();
  if(error)
  {
    res.status(400).send({ "Error": errors });
    return;
  }
  else {
    userService.loginService(email,password,(err,result) => {
      if(err){
        res.status(401).json({
          message : err
        })
      }else{
        res.status(200).json({
          message: 'Login Successfull!!!!!',
          token : result
        })
    }
    });
  }
};
/**
 * @description Prototype property adding the property functions.
 * 
 * @method forget() - Forget Password method allows user to create a new password incase they forget it using email services
 */
UserController.prototype.forget = (req,res,next) => {
  var email = req.body.email;
  req.checkBody('email','Email is Required').notEmpty();
  req.checkBody('password','Password is Required').notEmpty();
  var error = req.validationErrors();
  if(error)
  {
    res.status(400).send({ "Error" : errors });
    return;
  }
  else {
    userService.loginService(email,password,(err,result) => {
      if(err){
        res.status(401).json({
          message : err
        })
      }else{
        userService.forgetService = (email,(error,result) => {
          if(error){
            res.status(500).json({
              error : error
            });
          }else {
            res.status(200).json({
              result : result
            });
          }
        });
    }
  });
}
};

module.exports = new UserController();
