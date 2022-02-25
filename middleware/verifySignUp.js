const User = require("../models/User");

checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return true;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return false;
      }

      next();
    });
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;