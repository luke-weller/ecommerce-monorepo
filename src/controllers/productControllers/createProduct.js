const Product = require("../../models/products");

async function createProduct(req, res) {
  const productData = req.body;
  try {
    const newProduct = await Product.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = createProduct;
