const { v4: uuidv4 } = require("uuid");

const pool = require("../../config/database");

class Cart {
  static async createCart(cartData) {
    const { userId } = cartData;
    const id = uuidv4();
    const createdAt = new Date();
    const isEmpty = true;
    const totalPrice = 0;

    const query =
      "INSERT INTO cart (id, user_id, created_at, is_empty, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [id, userId, createdAt, isEmpty, totalPrice];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async deleteCart(cartId) {
    const query = "DELETE FROM cart WHERE id = $1 RETURNING *";
    const values = [cartId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Cart;
