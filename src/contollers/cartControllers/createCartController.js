const Cart = require("../../models/cart");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function createCartController(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const newCart = await Cart.createCart({ userId });
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = createCartController;
