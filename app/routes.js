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

  // app.post('/login', do stuff);


  // Signup Routes
  // ----------------------------------------------
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // app.post('/signup', process signup);


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

