const protectedRoute = (req, res, next) => {
  if (req.session.currentUser && req.session.admin) {
    next();
  } else {
    req.flash.message('error', 'access forbidden')
    res.redirect('/dashboard');
  }
};

module.exports = protectedRoute;