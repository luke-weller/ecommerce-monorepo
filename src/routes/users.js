const express = require("express");
const router = express.Router();
const registerUser = require("../contollers/usersController/registerUserController");
const deleteUser = require("../contollers/usersController/deleteUserController");
const getUserByEmail = require("../contollers/usersController/getUserByEmailController");
const updateUser = require("../contollers/usersController/updateUserController");

router.post("/register", registerUser);
router.delete("/:userId", deleteUser);
router.get("/:userEmail", getUserByEmail);
router.put("/:userId", updateUser);

module.exports = router;
