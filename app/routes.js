module.exports = function(app, passport) {

  // Index Route
  // ----------------------------------------------
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });


  // Login Routes
  // ----------------------------------------------
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // Signup Routes
  // ----------------------------------------------
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // User Profile Route
  // ----------------------------------------------
      // we will want this protected so you have to be logged in to visit
      // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });


  // Logout Route
  // ----------------------------------------------
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};


// Route Middleware
function isLoggedIn(req, res, next) {

  // If authenticated, proceed
  if (req.isAuthenticated()) {
    return next();
  }

  // If not, redirect them to login
  res.redirect('/login');

}

