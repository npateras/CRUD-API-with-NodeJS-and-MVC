const User = require("../models/User");
const bcrypt = require("bcryptjs");
const logger = require('../startup/logging');
const jwt = require("jsonwebtoken");
const verifySignUp = require("../middleware/verifySignUp");

// Post Request for Register
const registerUser = (req, res) => {
  const { first_name, last_name, email, password, confirm } = req.body;

  if (!first_name || !last_name || !email || !password || !confirm) {

    logger.log.info("Not all required fields were given when trying to register a new user.");
    return res.status(400).json({
      status:"fail",
      message: "Not all required fields were given."
    });
  }
  // Confirm Passwords
  if (password !== confirm) {
    return res.status(400).json({
      status:"fail",
      message: "Passwords must match."
    });
  } else {
    verifySignUp.checkDuplicateEmail(req, res).then(isTaken => {
      if (isTaken == true) {
        const newUser = new User({
          first_name,
          last_name,
          email,
          password,
        });
        // Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// Logging In Function
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email: email
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      status: "success",
      data: {
        id: user._id,
        email: user.email,
        date_registered: user.date_registered,
        accessToken: token
      }

    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};