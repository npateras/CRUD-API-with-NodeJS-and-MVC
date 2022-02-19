const mongoose = require("mongoose");

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
module.exports = Location;