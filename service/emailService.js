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
