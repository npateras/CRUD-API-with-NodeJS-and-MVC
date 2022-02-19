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
    minlength: 6,
    maxlength: 256,
    required: true,
  },
  date_registered: {
    type: Date,
    default: Date.now,
  },

});

const User = mongoose.model("User", UserSchema);

const validateUser = (User) => {
  const schema =  {
    first_name: Joi.string().min(5).max(256).required(),
    last_name: Joi.string().min(5).max(256).required(),
    email: Joi.string().min(5).max(256).required(),
    password: Joi.string().min(5).max(256).required(),
  }
  return Joi.validate(User, schema);
}

module.exports = User;