const protectedRoute = (req, res, next) => {
  if (req.session.currentUser && !req.session.admin) {
    next();
  } else {
    req.flash.message('error', 'you don\'t have permissions to see that page')
    res.redirect('/dashboard');
  }
};

module.exports = protectedRoute;