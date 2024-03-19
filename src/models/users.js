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
}

module.exports = User;
