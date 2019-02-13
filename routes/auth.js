const bcrypt = require('bcrypt');
const Store = require('../models/Store');
const StoreOwner = require('../models/storeOwner');
const Admin = require('../models/Admin');

const bcryptSalt = 10;

module.exports = (app) => {
  /* GET home page. */
  app.get('/', (req, res, next) => {
    res.render('auth/login');
  });

  app.get('/admin', (req, res, next) => {
    res.render('auth/admin');
  });

  app.post('/admin', (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
      res.render('auth/admin', {
        errorMessage: 'Indicate a username and a password to ',
      });
      return;
    }
    Admin.findOne({ username })
      .then((user) => {
        if (!user) {
          req.flash('error', 'Invalid credentials');
          res.redirect('/admin');
        }
        if (bcrypt.compareSync(password, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          req.session.admin = true;
          res.redirect('/dashboard');
        } else {
          res.render('auth/admin', {
            errorMessage: 'Incorrect password or username',
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  });

  app.get('/signup', (req, res, next) => {
    res.render('auth/signup');
  });

  app.post('/signup', async(req, res, next) => {
    const { username, password, name, location, CIF } = req.body;

    if (username === '' || password === '') {
      req.flash('error', 'empty fields');
      res.redirect('/signup');
    } else {
      try {
        const user = await StoreOwner.findOne({ username });
        const store = await Store.findOne({ CIF });
        if (!user && !store) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          const newStore = await Store.create({name, CIF, location});
          await StoreOwner.create({ username, password: hashPass, _store: newStore.id });
          res.redirect('/dashboard');
        } else {
          req.flash('error', 'That user or store already exists');
          res.redirect('/signup');
        }
      }catch(error) {
        next(error);
      }
    }
  });


  app.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Indicate a username and a password to sign up',
      });
      return;
    }
    StoreOwner.findOne({ username })
      .then((user) => {
        if (!user) {
          req.flash('error', 'The username doesn\'t exist')
          res.redirect('/');
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          req.session.admin = false;
          res.redirect('/dashboard');
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

  app.get('/logout',(req,res,next) => {
    req.session.destroy();
    res.redirect('/');
  })
};
