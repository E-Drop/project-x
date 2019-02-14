const loggedNotAdmin = require('../middlewares/loggedNotAdmin');
const StoreOwner = require('../models/storeOwner');

module.exports = app => {
  app.get('/profile', loggedNotAdmin, async (req, res, next) => {
    const user = await StoreOwner.findById(req.session.currentUser._id).populate(
      '_store'
    );
    res.render('store/profile', { user });
  });
};
