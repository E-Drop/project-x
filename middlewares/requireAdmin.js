const protectedRoute = (req, res, next) => {
  if (req.session.currentUser && req.session.admin) {
    next();
  } else {
    req.flash('error', 'access forbidden')
    res.redirect('/dashboard');
  }
};

module.exports = protectedRoute;