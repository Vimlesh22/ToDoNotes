/***************************************************************************************
 *  Purpose         : Defines a Model for Users .
 *
 *  @description
 *
 *  @file           : userModel.js
 *  @overview       : Creates a Schema for user .
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 *****************************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} mongoose class instance of the mongoose.
 * @var {Class} jwt class instance of the jsonwebtoken.
 * @var {Class} nodemailer class instance of the nodemailer.
 * @var {Class} bcrypt class instance of the bcrypt.
 * @var {Class} emailService class instance of the emailService.
 * @var {Class} config class instance.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require ('../secret/config');
const nodemailer = require('nodemailer');
const emailService = require('../service/emailService');
function UserModel() {

}

/**
* @description creation user schema using mongoose
*/
var userSchema = mongoose.Schema({
  username : { type : String,required : true },
  email : { type : String,required : true,unique : true },
  password : { type : String,required : true }
});

var User = mongoose.model('Users',userSchema);

/**
 * @description Prototype property adding the property functions for UserModel Calss.
 * @method signupModel() - SignUp a new User .
 */
UserModel.prototype.signupModel = (username,email,password,callback) => {
 User.find({email : email}).then((user,err) => {
      if(user.length >= 1){
        callback('User already exists!!!!!....Create a new user');
      }else{
        bcrypt.hash(password,10,(err,hash) => {
          if(err){
            callback(err)
          }
          else{

            var user = new User({
              username : username,
              email : email,
              password : hash
            });

            user.save()
            .then((result) => {
                callback(null,result)
            },(err)=>{
                callback(err)
            });
          }
        });
      };
    });
};

/**
 * @description Prototype property adding the property functions for UserModel Calss.
 * @method loginModel() - Login a User who is already registered .
 */
UserModel.prototype.loginModel = (email,password,callback) => {
  User.findOne({ email : email})
  .then((result,err) => {
    if(err){
      callback(err);
    }if(result === null){
      callback('User Doesn\'t Exist');
    }
    else if(result){
      bcrypt.compare(password,result.password,(error,result1) => {
        if(error){
          callback(error);
        }
        if(result1){
          const token = jwt.sign({
            email : email,
          },config.secret,{
            expiresIn : "1h"
          })
          callback(null,token);
        }else {
          callback(error)
        }
      })
    }
  });
};

/**
 * @description Prototype property adding the property functions for UserModel Calss.
 * @method forgetModel() - Creates new password for a user already exists .
 */
UserModel.prototype.forgetModel = function (email,callback) {
  Note.find({ email : email })
  .then((result,err) => {
    if(error){
      callback(error);
    }else {

      emailService.emailService((error,sucess) => {
        if(error){
          console.log("error");
        }else {
          console.log("success");
        }
      });
      callback(null,result);
    }
  });
};

module.exports = new UserModel();
