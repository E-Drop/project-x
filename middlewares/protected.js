const protectedRoute = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    req.flash.message('error', 'you need to be logged in to access that page')
    res.redirect('/');
  }
};

module.exports = protectedRoute;
