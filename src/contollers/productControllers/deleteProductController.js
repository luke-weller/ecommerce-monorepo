const Product = require("../../models/products");

async function deleteProductController(req, res) {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.deleteProductController(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = deleteProductController;
