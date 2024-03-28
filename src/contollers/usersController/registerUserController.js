const User = require("../../models/users");

async function registerController(req, res) {
  const userData = req.body;
  try {
    const newUser = await User.registerController(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = registerController;
