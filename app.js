require("dotenv").config();
const express = require('express');
const path = require('path');
const logger = require('morgan');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();

// use PHP as view engine in Express
// must specify options hash even if no options provided!
var phpExpress = require('php-express')({

  // assumes php is in your PATH
  binPath: 'php'
});
// set view engine to php-express
app.set('views', './views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,OPTIONS,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

module.exports = app;
