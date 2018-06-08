const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require ('../secret/config');
const nodemailer = require('nodemailer');
const emailService = require('../service/emailService');
function UserModel() {

}

var userSchema = mongoose.Schema({
  username : { type : String,required : true },
  email : { type : String,required : true,unique : true },
  password : { type : String,required : true }
});

var User = mongoose.model('Users',userSchema);

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
