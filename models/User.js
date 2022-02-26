const mongoose = require("mongoose");
const Joi = require("Joi");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  last_name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    unique: true,
    lowercase: true,
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


const validateUser = (User) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(256).required(),
    last_name: Joi.string().min(3).max(256).required(),
    email: Joi.string().lowercase().min(5).max(256).required(),
    password: Joi.string().min(5).max(256).required(),
  });
  return schema.validate(User);
}

UserSchema.pre('save', function(next) {

  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, function(err, salt) {

    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {

      if(err) return next(err)

      user.password = hash

      next()

    })

  })

})

const User = mongoose.model("User", UserSchema);

module.exports = User;
module.exports.User = User;
module.exports.validate = validateUser;
