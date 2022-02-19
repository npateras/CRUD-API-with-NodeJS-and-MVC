const express = require("express")
const cors = require("cors");
const path = require("path");
const config = require('./startup/config');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const winston = require('winston');
const err = require('./middleware/errors');
const session = require('express-session');
const passport = require("passport");
const app = express();

require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();

const { loginCheck } = require("./auth/passport");
loginCheck(passport);

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(customerRoutes.routes);
app.use(err);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/login"));

app.listen(config.port, () => winston.info('App is listening on url ' + config.url + ':' + config.port));