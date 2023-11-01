const express = require("express");
const UsersController = require("../controllers/usersController");

const router = express.Router();

router.post("/register", UsersController.registerUser);

module.exports = router;
