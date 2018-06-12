/***************************************************************************************
 *  Purpose         : Defines all the Services required for notes application.
 *
 *  @description
 *
 *  @file           : userService.js
 *  @overview       : Creating services for notes application.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 *****************************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} userModel class instance of the nodemailer.
 */
const userModel = require('../model/userModel');

function UserService() {

}

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method signupService() - service for signup user.
 */
UserService.prototype.signupService = (userName,email,password,callback) => {
  userModel.signupModel(userName,email,password,(err,result) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};
/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method loginService() - service for login user.
 */
UserService.prototype.loginService = (email,password,callback) => {
  userModel.loginModel(email,password,(err,result) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};
/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method forgetService() - Create a service for creation of notes.
 */
UserService.prototype.forgetService = (email,callback) => {
  userModel.forgetModel(email,(result,err) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};
module.exports = new UserService();
