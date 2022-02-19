const express = require("express")
const app = express();
const mongoose = require("mongoose");
const config = require('./startup/config');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();


require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();

const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));


app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started at port " + PORT));