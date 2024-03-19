const express = require("express");
const router = express.Router();
const loginController = require("../contollers/usersController/loginCotroller");
const logoutController = require("../contollers/usersController/logoutController");

router.post("/login", loginController.login);

router.delete("/logout", logoutController.logout);

module.exports = router;
