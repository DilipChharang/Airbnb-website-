const express = require("express");
const router = express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport= require("passport");
const {saveRedirectUrl}= require("../middleware.js");
const userControllers= require("../controllers/users.js");

router.route("/signup")
.get(userControllers.renderSignupForm ) // signup user
.post(wrapAsync(userControllers.signup)); // post route

router.route("/login")
.get(userControllers.renderLoginForm) //login user
.post(saveRedirectUrl, 
   passport.authenticate("local", {
   failureRedirect: "/login",
   failureFlash: true,
}), userControllers.login) //post 

//logout user
router.get("/logout", userControllers.logout)

module.exports= router;