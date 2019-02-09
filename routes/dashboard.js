
module.exports = (app) => {
    app.get('/dashboard', (req, res, next) => {
      res.render('index', { title: 'Express' });
    });
};
