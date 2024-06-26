const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const pool = require("../../config/database");

class User {
  static async registerController(userData) {
    const { email, password, first_name, last_name } = userData;

    const id = uuidv4();
    const createdAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (id, email, password, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const values = [
      id,
      email,
      hashedPassword,
      first_name,
      last_name,
      createdAt,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async deleteUser(userId) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  }

  static async getUserByEmail(userEmail) {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [userEmail]);
    return rows[0];
  }

  static async updateUser(userId, userData) {
    const { email, first_name, last_name } = userData;
    const query =
      "UPDATE users SET email = $1, first_name = $2, last_name = $3 WHERE id = $4 RETURNING *";
    const values = [email, first_name, last_name, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = User;
