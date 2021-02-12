/**
 * Module dependencies.
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression =require('compression')
const usersRouter = require('./routes/users');
const app = express();

/*
Attach it to your Express app instance or Router. Any routes attached
to the app or Router after this will be intercepted and cached.
 */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Using compression for heavy load  of data
app.use(compression())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next()
});

module.exports = app;
