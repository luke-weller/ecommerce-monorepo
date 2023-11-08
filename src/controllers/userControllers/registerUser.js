const User = require("../../models/user");

const registerUser = async (req, res) => {
  const userInfo = req.body;

  try {
    const user = await User.createUser(userInfo);
    console.log(`register controller log: ${userInfo}`);
    const { email, password, first_name, last_name } = user;
    if (!email) {
      res.status(400).json({ error: "Email missing from the request body" });
    }
    if (!password) {
      res.status(400).json({ error: "Password missing from the request body" });
    }
    if (!first_name) {
      res
        .status(400)
        .json({ error: "first name missing from the request body" });
    }
    if (!last_name) {
      res
        .status(400)
        .json({ error: "last name missing from the request body" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
};

module.exports = { registerUser };
