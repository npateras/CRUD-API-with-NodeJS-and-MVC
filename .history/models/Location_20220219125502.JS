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
    first_name: Joi.string().min().max().required(),
    last_name: Joi.string().min().max().required(),
    email: Joi.string().min().max().required(),
    password: Joi.string().min().max().required(),
    : Joi.string().min().max().required(),
  }
}

module.exports = Location;