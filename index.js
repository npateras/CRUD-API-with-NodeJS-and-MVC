const express = require("express");
const cors = require("cors");
const config = require('./startup/config');
const bodyParser = require('body-parser');
const err = require('./middleware/errors');

const app = express();

const landmarkRoutes = require('./routes/landmark-routes');
const loginRoutes = require('./routes/login-routes');
const userRoutes = require('./routes/user-routes');

const logger = require('./startup/logging');
require('./startup/db')();
require('./startup/validations')();

// BodyParsing
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(landmarkRoutes.routes);
app.use(loginRoutes.routes);
app.use(userRoutes.routes);
app.use(err);

app.listen(config.port, () => logger.log.info('App is listening on url ' + config.url));