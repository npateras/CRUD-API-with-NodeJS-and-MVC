const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  last_name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 256,
    required: true,
  },
  password: {
    type: String,
    maxlength: 256,
    required: true,
  },
  date_registered: {
    type: Date,
    default: Date.now,
  },

});

const User = mongoose.model("User", UserSchema);
module.exports = User;