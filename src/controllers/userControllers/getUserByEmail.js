const User = require("../../models/user");

async function getUserByEmail(req, res) {
  const { userEmail } = req.params;
  console.log(`Request params email: ${userEmail}`);

  try {
    const user = await User.getUserByEmail(userEmail);
    console.log(`user data: ${user}`);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getUserByEmail };
