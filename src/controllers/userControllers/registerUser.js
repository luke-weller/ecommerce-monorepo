const User = require("../../models/user");

const registerUser = async (req, res) => {
  const userInfo = req.body;

  try {
    const user = await User.createUser(userInfo);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
};

module.exports = { registerUser };
