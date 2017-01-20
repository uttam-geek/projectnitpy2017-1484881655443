var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



//Routes
var index = require('./routes/index');
var users = require('./routes/users');

//Cloud connect
cfenv = require("cfenv");
appEnv   = cfenv.getAppEnv();


//Express Package
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //HTML .ejs

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //For resources



app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


app.get('/process_get', function (req, res) {
// Prepare output in JSON format
response = {
first_name:req.query.first_name,
last_name:req.query.last_name
};
console.log(response);
res.end(JSON.stringify(response));
})

/*Server*/
var server = app.listen(appEnv.port, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})


//var watson = require('watson-developer-cloud');
//console.log(watson);

module.exports = app;
