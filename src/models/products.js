const pool = require("../../config/database"); // Your database connection pool

class Product {
  static async getAllProducts() {
    const query = "SELECT * FROM products";
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getProductById(productId) {
    const query = "SELECT * FROM products WHERE id = $1";
    const { rows } = await pool.query(query, [productId]);
    return rows[0];
  }

  static async createProduct(productData) {
    const { name, price, description } = productData;
    const query =
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, price, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async updateProduct(productId, productData) {
    const { name, price, description } = productData;
    const query =
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *";
    const values = [name, price, description, productId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async deleteProduct(productId) {
    const query = "DELETE FROM products WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [productId]);
    return rows[0];
  }
}

module.exports = Product;
