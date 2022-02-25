const mongoose = require("mongoose");
const Joi = require("Joi");

const LandmarkSchema = new mongoose.Schema({
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

const Landmark = mongoose.model("Landmark", LandmarkSchema);

const validateLandmark = (Landmark) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(256).required(),
    country: Joi.string().min(5).max(256).required(),
  });
  return schema.validate(Landmark);
}

module.exports.Landmark = Landmark;
module.exports.validate = validateLandmark;