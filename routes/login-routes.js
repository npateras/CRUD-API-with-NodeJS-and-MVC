const express = require("express");
const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");

const { locationsView } = require("../controllers/landmarkController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/register", registerView);
router.get("/login", loginView);

// Locations
// router.get("/locations", protectRoute, locationsView);

router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = {
    routes: router
}