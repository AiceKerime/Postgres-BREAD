const path = require('path');
const createError = require('http-errors');

const { Pool } = require('pg');
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const db = new Pool({
  host: "localhost",
  user: "afiizza",
  port: 5432,
  password: "12345",
  database: "bread"
})

db.query('SELECT * FROM public."dataBread"', (err, data) => {
  if (err) {
    console.log('Failed to get data', err)
  }
  console.log(data.rows)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
