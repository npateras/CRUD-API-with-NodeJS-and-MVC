const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// For Register Page
const registerView = (req, res) => {
  res.render("../views/Account/register", {});
};

// Post Request for Register

const registerUser = (req, res) => {
  const { first_name, last_name, email, password, confirm } = req.body;

  if (!first_name || !last_name || !email || !password || !confirm) {
    console.log("Fill the empty fields");
  }

  // Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } else {
    // Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("../views/Account/register", {
          first_name,
          last_name,
          email,
          password,
          confirm,
        });
      } else {
        // Validation
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

// For View
const loginView = (req, res) => {
  res.render("../views/Account/login", {});
};

// Logging In Function
const loginUser = (req, res) => {
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("../views/Account/login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};