const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/pointsOfInterestDb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
        useCreateIndex: true
    }).then(() => winston.info('MongoDB connected successfully!'))
}