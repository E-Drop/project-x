const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const login = require('./routes/auth');
const dashboard = require('./routes/dashboard');
const products = require('./routes/products')

// cookie-parser save cookies in the browser
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// file where you put the sensible information of your app
const keys = require('./bin/config/keys');

// protectedRoute check if the user is login
// usage: app.use('/products', requireLogin, 'path/to/protected/route');
const requireLogin = require('./middlewares/protected');
const notifications = require('./middlewares/notifications');

mongoose.connect(keys.db, { useNewUrlParser: true })
  .then(() => console.log('connected'))
  .catch(error => console.log('error', error));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.set('layout', 'layouts/main');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
  secret: 'boilerplate',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use((req, res, next) => {
  console.log('session', req.session);
  next();
});
app.use(flash());
app.use(notifications);

app.use((req, res, next) => {
  // for the whole app //
  app.locals.currentUser = req.session.currentUser;
  // for the next middleware //
  res.locals.currentUser = req.session.currentUser;
  next();
});

login(app);
dashboard(app);
products(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
