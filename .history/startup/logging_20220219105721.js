const winston = require('winston');
require('express-async-errors');

module.exports = () => {
    process.on('uncaughtException', ex => {
        winston.error(ex.mesage)
    })
}