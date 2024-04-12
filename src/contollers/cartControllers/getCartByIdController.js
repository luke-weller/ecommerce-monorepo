const Cart = require("../../models/cart");

async function getCartByIdController(req, res) {
  const { cartId, userId } = req.params;

  try {
    const cart = await Cart.getCartById(cartId);

    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else if (cart.userId !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getCartByIdController;
