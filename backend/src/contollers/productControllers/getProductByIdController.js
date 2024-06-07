const Product = require("../../models/products");

async function getProductByIdController(req, res) {
  const { productId } = req.params;
  try {
    const product = await Product.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getProductByIdController;
