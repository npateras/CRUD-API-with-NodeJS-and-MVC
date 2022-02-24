const express = require("express");
var favicon = require('serve-favicon');
const cors = require("cors");
const path = require("path");
const config = require('./startup/config');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const winston = require('winston');
const err = require('./middleware/errors');
const passport = require('passport');
const session = require('express-session');

const { loginCheck } = require("./auth/passport");
loginCheck(passport);

const app = express();

const locationRoutes = require('./routes/location-routes');
const loginRoutes = require('./routes/login-routes');
const userRoutes = require('./routes/user-routes');

const { loggers } = require("winston");

const logger = require('./startup/logging');
require('./startup/db')();
require('./startup/validations')();

app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParsing
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Express session
app.use(
  session({
    secret: 'mpsp21043-secret-key',
    saveUninitialized: true,
    resave: true
  })
);
app.use(favicon(path.join(__dirname, '/public/images', 'favicon.ico')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(locationRoutes.routes);
app.use(loginRoutes.routes);
app.use(userRoutes.routes);
app.use(err);

app.listen(config.port, () => logger.log.info('App is listening on url ' + config.url));