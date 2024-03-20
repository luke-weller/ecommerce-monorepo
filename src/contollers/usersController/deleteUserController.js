const User = require("../../models/users");

async function deleteUserController(req, res) {
  const { userId } = req.params;
  try {
    const deletedUser = await User.deleteUser(userId);
    if (!deletedUser) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = deleteUserController;
