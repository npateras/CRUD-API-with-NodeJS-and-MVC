const winston = require('winston');
// require('express-async-errors');

const tsFormat = () => (new Date().toISOString());

const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'errors.log',
            timestamp: tsFormat,
            level: 'info'
        })
    ]
});

const accessLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'access.log',
            timestamp: tsFormat,
            level: 'info'
        })
    ]
});


module.exports = {
    errorLog: errorLog,
    accessLog: accessLog
};

/* module.exports = () => {
    process.on('uncaughtException', ex => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
    process.on('unhandledRejection', ex => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
    winston.add(winston.transports.File, {filename: 'logfile.log'});
} */