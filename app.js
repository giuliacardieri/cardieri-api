var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var IndexRouter = require('./routes/index');
var EmpreendimentosRouter = require('./routes/empreendimentos');

var app = express();

var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Database connection
// app.use(function(req, res, next){
// 	res.locals.connection = mysql.createConnection({
// 		host     : 'cardieri2018.mysql.uhserver.com',
// 		user     : 'giulia93',
// 		password : 'INC.2018',
// 		database : 'cardieri2018'
// 	});
// 	res.locals.connection.connect();
// 	next();
// });

app.use('/', IndexRouter);
app.use('/api/empreendimentos', EmpreendimentosRouter);

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
});

module.exports = app;
