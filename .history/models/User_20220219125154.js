const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  first_name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_registered: {
    type: Date,
    default: Date.now,
  },

});

const User = mongoose.model("User", UserSchema);
module.exports = User;