const mongoose = require("mongoose");
const Joi = require("Joi");

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 256,
    required: true,
  },
  country: {
    type: String,
    minlength: 5,
    maxlength: 256,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", LocationSchema);

const validateLocation = (Location) => {
  const schema =  {
    name: Joi.string().min(5).max(256).required(),
    country: Joi.string().min(5).max(256).required(),
  }
  return Joi.validate(Location)
}

module.exports = Location;