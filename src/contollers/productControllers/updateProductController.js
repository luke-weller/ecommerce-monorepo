const Product = require("../../models/products");

async function updateProductController(req, res) {
  const { productId } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await Product.updateProductController(
      productId,
      productData
    );
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = updateProductController;
