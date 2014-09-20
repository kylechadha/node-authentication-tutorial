var localStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');

module.exports = function(passport) {

  // Session Management
  // ----------------------------------------------

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findBy(id, function(err, user) {
      done(err, user);
    });
  });


  // Sign Up
  // ----------------------------------------------

  passport.use('local-signup', new LocalStrategy( {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  // ** WHAT IS DONE HERE? USED MANY PLACES. CHECK NODEJITSU DOCS.
  function(req, email, password, done) {

    // ** WHAT IS PROCESS? CHECK NODEJITSU DOCS.
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose email is the same as the forms email
      User.findOne({ 'local.email' :  email }, function(err, user) {

        // if there are any errors, return the error
        if (err) {
          return done(err);
        }

        // check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
          });
        }

      });

    });

  }));

};