const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "Login successful", user, token });
    });
  })(req, res, next);
};
