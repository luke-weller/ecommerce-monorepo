const { v4: uuidv4 } = require("uuid");

const pool = require("../../config/database");

class Category {
  static async createCategory(categoryData) {
    const { name, description } = categoryData;
    const id = uuidv4();

    const query =
      "INSERT INTO categories (id, name, description) VALUES ($1, $2, $3) RETURNING *";
    const values = [id, name, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async deleteCategory(categoryId) {
    const query = "DELETE FROM categories WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [categoryId]);
    return rows[0];
  }
}

module.exports = Category;
