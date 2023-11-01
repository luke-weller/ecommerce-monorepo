const Product = require("../models/products");

class ProductsController {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getProductById(req, res) {
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

  static async createProduct(req, res) {
    const productData = req.body;
    try {
      const newProduct = await Product.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateProduct(req, res) {
    const { productId } = req.params;
    const productData = req.body;
    try {
      const updatedProduct = await Product.updateProduct(
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

  static async deleteProduct(req, res) {
    const { productId } = req.params;
    try {
      const deletedProduct = await Product.deleteProduct(productId);
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
}

module.exports = ProductsController;
