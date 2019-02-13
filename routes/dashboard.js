const requireLogin = require('../middlewares/protected');
module.exports = (app) => {
  app.get('/dashboard', requireLogin,(req, res, next) => {
    if(req.session.admin){
      res.render('dashboard/admin', { title: 'Express' });
    } else {
      res.render('dashboard/store', { title: 'Express' });
    }
  });
};
