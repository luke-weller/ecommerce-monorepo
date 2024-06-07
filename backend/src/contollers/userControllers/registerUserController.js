const User = require("../../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function registerController(req, res) {
  const userData = req.body;

  try {
    const existingUser = await User.getUserByEmail(userData.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = await User.registerController(userData);
    const token = jwt.sign({ userId: newUser.id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(201).json({ newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = registerController;
