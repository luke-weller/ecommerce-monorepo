const express = require("express");
const router = express.Router();
const loginController = require("../contollers/authControllers/loginCotroller");
const logoutController = require("../contollers/authControllers/logoutController");

router.post("/login", loginController.login);

router.delete("/logout", logoutController.logout);

module.exports = router;
