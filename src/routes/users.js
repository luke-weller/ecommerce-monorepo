const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userControllers/registerUser");
const {
  getUserByEmail,
} = require("../controllers/userControllers/getUserByEmail");

router.get("/:email", getUserByEmail);
router.post("/register", registerUser);

module.exports = router;
