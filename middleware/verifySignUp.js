var User = require("../models/User");

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
        res.status(400).json({
          status:"fail",
          message: "Email is already in use!",
          data: {
              user
          }
        });
        return false;
      }

      next();
    });
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;