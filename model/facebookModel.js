/******************************************************************************
 *  Purpose         : Defines a Model for facebook .
 *
 *  @description
 *
 *  @file           : facebookModel.js
 *  @overview       : Creates a Schema for storing details of facebook users.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 ******************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} mongoose class instance of the mongoose.
 */
const mongoose = require('mongoose');

var facebookSchema = mongoose.Schema({
  facebook : { type : String },
  fullname : { type : String },
  fbToken : { type : String }
});
var facebook = mongoose.model('facebookDetails' , facebookSchema);
module.exports = facebook;
