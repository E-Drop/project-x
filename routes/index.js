const bcrypt = require('bcrypt');
const User = require('../models/user');

const bcryptSalt = 10;

module.exports = (app) => {
  /* GET home page. */
  app.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
  });

  app.get('/signup', (req, res, next) => {
    res.render('auth/signup');
  });

  app.post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
      req.flash('error', 'empty fields by flash');
      res.redirect('/signup');
    } else {
      User.findOne({ username })
        .then((user) => {
          if (!user) {
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);
            User.create({ username, password: hashPass })
              .then(() => {
                res.redirect('/products');
              })
              .catch((error) => {
                next(error);
              });
          } else {
            req.flash('error', 'incorrect');
            res.redirect('/signup');
          }
        })
        .catch((error) => {
          next(error);
        });
    }
  });

  app.get('/login', (req, res, next) => {
    res.render('auth/login', { errorMessage: undefined });
  });

  app.post('/login', (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;

    if (username === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Indicate a username and a password to sign up',
      });
      return;
    }
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          res.render('auth/login', {
            errorMessage: "The username doesn't exist",
          });
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          res.redirect('/');
        } else {
          res.render('auth/login', {
            errorMessage: 'Incorrect password or username',
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  });
};
