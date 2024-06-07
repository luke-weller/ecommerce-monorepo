const Product = require("../../models/products");

async function getAllProductsController(req, res) {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getAllProductsController;
