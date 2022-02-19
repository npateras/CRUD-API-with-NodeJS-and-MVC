const mongoose = require('mongoose');
const winston = require('winston');

// MongoDB connections
module.exports = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    }).then(() => winston.info('MongoDB connected successfully!'))
}