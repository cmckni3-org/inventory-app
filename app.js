var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var expressHbs   = require('express-handlebars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Using work around compilerOptions: undefined for now.
// This was changed in handlebars version 3.0.2 with ES 2015 support
app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs', compilerOptions: undefined}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var inventory = require('./app/inventory/');

app.route('/')
  .get(inventory.list)
  .post(inventory.create);
app.route('/:id')
  .get(inventory.show)
  .post(inventory.update)
  .delete(inventory.delete);
app.route('/new').get(inventory.new);
app.route('/:id/edit').get(inventory.edit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
