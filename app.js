var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let multer = require('multer');
let upload = multer();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Enabling cors
app.use(cors());

//Body parser for POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Parsing multipart form data
app.use(upload.array());

//DB connection via mongoose
let db = require('./config/key').mongoURI;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB connection successful"))
    .catch(error => console.log(error));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

//Linking app to show react frontend files
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
