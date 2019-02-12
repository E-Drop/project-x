const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const Admin = require('../models/Admin');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync('1t4l14nF00d', salt);
    Admin.create({ username: 'Admin', password: hashPass});
  })
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });
