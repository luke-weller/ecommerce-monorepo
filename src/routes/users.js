const express = require("express");
const router = express.Router();
const registerUser = require("../contollers/usersController/registerController");
const deleteUser = require("../contollers/usersController/deleteUserController");

router.post("/register", registerUser);
router.delete("/:userId", deleteUser);

module.exports = router;
