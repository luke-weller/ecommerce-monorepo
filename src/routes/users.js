const express = require("express");
const router = express.Router();
const registerUser = require("../contollers/userControllers/registerUserController");
const deleteUser = require("../contollers/userControllers/deleteUserController");
const getUserByEmail = require("../contollers/userControllers/getUserByEmailController");
const updateUser = require("../contollers/userControllers/updateUserController");

router.post("/register", registerUser);
router.delete("/:userId", deleteUser);
router.get("/:userEmail", getUserByEmail);
router.put("/:userId", updateUser);

module.exports = router;
