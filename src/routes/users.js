const express = require("express");
const router = express.Router();
const registerUser = require("../contollers/usersController/registerController");
const deleteUser = require("../contollers/usersController/deleteUserController");
const getUserByEmail = require("../contollers/usersController/getUserByEmailController");

router.post("/register", registerUser);
router.delete("/:userId", deleteUser);
router.get("/:userEmail", getUserByEmail);

module.exports = router;
