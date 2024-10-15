const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {
  signupUser,
  signinUser,
  getuser,
  forgotPassword,
} = require("../Controllers/UserController.js");
const {resetPassword } = require("../Controllers/UserController.js");

const router = express.Router();
router.post("/signup-user", signupUser);
router.post("/signin-user", signinUser);
router.get("/get-user", getuser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

module.exports = router;
