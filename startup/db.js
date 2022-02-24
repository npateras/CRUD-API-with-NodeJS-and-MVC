const mongoose = require('mongoose');
const logger = require('./logging');

// MongoDB connections
module.exports = () => {
    mongoose.connect(process.env["MONGODB_URI"], {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => logger.log.info('MongoDB connected successfully!'))
}