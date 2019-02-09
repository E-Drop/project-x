const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const Admin = require('../models/Admin');

mongoose.connect('mongodb://localhost:27017/project-x', { useNewUrlParser: true })
  .then(() => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync('1t4l14nF00d', salt);
    Admin.create({ username: 'Admin', password: hashPass});
  })
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });
