const loggedNotAdmin = require('../middlewares/loggedNotAdmin');
const StoreOwner = require('../models/storeOwner');
const bcryptSalt = 10;

module.exports = app => {
  app.get('/profile', loggedNotAdmin, async (req, res, next) => {
    const user = await StoreOwner.findById(req.session.currentUser._id).populate(
      '_store'
    );
    res.render('store/profile', { user });
  });

  app.get('/profile/newPassword', loggedNotAdmin, (req,res,next) => {
    res.render('store/newPassword')  
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
        const hashPass = bcrypt.hashSync(password, salt);

        await StoreOwner.findByIdAndUpdate(req.session.currentUser._id, { password: hashPass })
        req.flash('success', 'password changed');
        res.redirect('/profile');
      }
    }

  })
};
