const Cart = require("../../models/cart");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

async function deleteCartController(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const { cartId } = req.params;
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deletedCart = await Cart.deleteCart(cartId);
    if (!deletedCart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      res.status(202).end("Cart successfully deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = deleteCartController;
