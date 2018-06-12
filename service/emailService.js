/***************************************************************************************
 *  Purpose         : Defines all the Services required to send email to particular user for email verification.
 *
 *  @description
 *
 *  @file           : emailService.js
 *  @overview       : Creating transporter for sending email.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 *****************************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} nodemailer class instance of the nodemailer.
 * @var {Class} config class instance
 */
const config = require ('../secret/config');
const nodemailer = require('nodemailer');

function EmailService() {

};

var transporter = nodemailer.createTransport({
  service : 'Gmail',
  secure : false,
  auth : {
    user : config.email,
    pass : config.password
  }
});

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method emailService() - Create a method to whom email is to sent after user clicking on forget password link.
 */
EmailService.prototype.emailService = (email,callback) => {
  var TOKEN = generateToken(user);
  var forgotURL = BASE_URL + '/forgetpassword?token=' + TOKEN
  var helperOptions = {
    from : 'Vimlesh Kumar <kumarvimlesh007@gmail.com>',
    to : email,
    subject : 'Please confirm your email address',
    html : 'Please click the link to confirm your email.<a href="'+forgotURL+'">click</a>'
  }

  transporter.sendMail(helperOptions,(error,success) => {
    if(error){
      callback(error);
    }else {
      callback(sucess);
    }
  });
};

module.exports = new EmailService();
