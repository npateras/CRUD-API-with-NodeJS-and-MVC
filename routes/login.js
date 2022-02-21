const express = require("express");

const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const { locationView } = require("../controllers/locationController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/views/Account/register.ejs", registerView);
router.get("/views/Account/login.ejs", loginView);
//Dashboard
router.get("/views/Locations/locations.ejs", protectRoute, locationView);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;