var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


// Schema
// ----------------------------------------------

var userSchema = mongoose.schema({

  local : {
    email : String,
    password : String
  }

  // Still need to add social schema

});


// Methods
// ----------------------------------------------

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
