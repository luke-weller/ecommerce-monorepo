const User = require("../../models/users");

async function updateUserController(req, res) {
  const { userId } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await User.updateUser(userId, userData);
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = updateUserController;
