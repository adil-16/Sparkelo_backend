const express = require("express");
const { loginUser } = require("../controllers/authController");
const router = express.Router();
// const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/login").post(loginUser);


module.exports = router;