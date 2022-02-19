const Join = require('joi');

module.exports = () => {
    Join.objectId = require('joi-objectid')(Joi)
}