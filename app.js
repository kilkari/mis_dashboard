var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var bodyParser = require('body-parser');


var app = express();

const passport = require('passport');

var useragent = require('express-useragent');
var helmet = require('helmet');

var axios = require('axios');

require('dotenv').config()


app.use(bodyParser.json({limit: '500mb'})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({limit: '500mb', extended: true, parameterLimit: 10000000}));
app.use(helmet.hsts());
app.use(passport.initialize());
app.use(useragent.express());
//var db = require("./config/db");


const {
    genuid, mod, length, eq, add, sub, includes, moment, toFixed, pagination, parseInt, gt,


} = require('./helper/hbs');

app.engine('handlebars', exphbs({
    helpers: {
        genuid, mod, length, eq, add, sub, includes, moment, toFixed, pagination, parseInt, gt,
    }, partialsDir: __dirname + '/views/partials/'
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(express.static("public"));

app.set('trust proxy', 1);

app.use(session({

    secret: 'testing', resave: true, saveUninitialized: true, cookie: {
        secure: false, maxAge: 1000 * 60 * 60 * 24 * 30
    }, genid: function (req) {
        return genuid() // use UUIDs for session IDs
    },
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.disable('etag');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
global.__basedir = __dirname;
global.__basedir__file = process.env.BASE_DIR_FILE;

module.exports = app;

