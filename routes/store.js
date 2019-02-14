const bcrypt = require('bcrypt');
const loggedNotAdmin = require('../middlewares/loggedNotAdmin');
const StoreOwner = require('../models/storeOwner');
const Store = require('../models/Store');
const bcryptSalt = 10;

module.exports = app => {
  app.get('/profile', loggedNotAdmin, async (req, res, next) => {
    try {
      const user = await StoreOwner.findById(req.session.currentUser._id).populate(
        '_store'
      );
      res.render('store/profile', { user });
    } catch(error) {
      next(error)
    }
  });


  app.post('/profile', loggedNotAdmin, async(req,res,next) => {
    const { username, name, location } = req.body;
    try {
      const result = await StoreOwner.findByIdAndUpdate(req.session.currentUser._id, { username });
      await Store.findByIdAndUpdate(result._store, { name, location })
      req.flash('success', 'New info modified');
      res.redirect('/profile');
    } catch(error) {
      next(error)
    }
  });


  app.get('/profile/newPassword', loggedNotAdmin, (req,res,next) => {
    res.render('store/newPassword');
  })

  app.post('/profile/newPassword', loggedNotAdmin, async(req,res,next) => {
    const { old, newP, repeat } = req.body;

    if (!bcrypt.compareSync(old, req.session.currentUser.password)) {
      req.flash('error','invalid password');
      res.redirect('/profile/newPassword');
    } else {
      if(newP !== repeat) {
        req.flash('error','Passwords do not match');
        res.redirect('/profile/newPassword');
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(newP, salt);
        try {
          await StoreOwner.findByIdAndUpdate(req.session.currentUser._id, { password: hashPass })
          req.flash('success', 'password changed');
          res.redirect('/profile');
        } catch(error) {
          next(error)
        }
      }
    }
  })
};
