const userModel = require('../model/userModel');

function UserService() {

}

UserService.prototype.signupService = (userName,email,password,callback) => {

  userModel.signupModel(userName,email,password,(err,result) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};

UserService.prototype.loginService = (email,password,callback) => {
  userModel.loginModel(email,password,(err,result) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};

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
