const express = require("express");
const router = express.Router();
const registerUser = require("../contollers/usersController/registerController");

router.post("/register", registerUser);

module.exports = router;
