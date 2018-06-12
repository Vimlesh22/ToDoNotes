/***************************************************************************************
 *  Purpose         : Defines a Strategy for Facebook Login.
 *
 *  @description
 *
 *  @file           : passport-facebook.js
 *  @overview       : Creates a middleware for social login.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 *****************************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} passport class instance of the passport.
 * @var {Class} User class instance .
 * @var {Class} FacebookStrategy class instance of the passport-facebook.
 * @var {Class} secret class instance .
 */
var passport = require('passport');
const User = require('../model/facebookModel');
const secret = require('../secret/secret');
var FacebookStrategy =  require('passport-facebook').Strategy;

passport.serializeUser((user,done) => {
  done(null,user.id);
});
passport.deserializeUser((id,done) => {
  User.findById(id,(err,user) => {
    done(err,user);
  });
});

passport.use(new FacebookStrategy({
  clientID : secret.facebook.clientID,
  clientSecret : secret.facebook.clientSecret,
  profileFields : ['email','displayName','photos'],
  callbackURL : 'http://localhost:3030/api/auth/facebook/callback',
  passReqToCallback : true
},(req,token,refreshToken,profile,done) => {
  console.log("Request Object: "+req);
  console.log("Token: "+token);
  console.log("refreshToken : "+refreshToken);
  console.log("profile: "+profile);
     User.findOne({ facebook : profile.id },(err,user) => {
    if (err) {
      return done(err);
    }if(user) {
      done(null,user)
    }else {
      const newUser = new User();
      newUser.facebook = profile.id;
      newUser.fullname = profile.displayName;
      newUser.fbToken.push({ token : token });
      newUser.save((err) => {
        return done(null,user);
      })
    }
  })
}));

module.exports = passport;
