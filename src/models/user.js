const { v4: uuidv4 } = require("uuid");
const pool = require("../../config/database");
const bcrypt = require("bcrypt");

class User {
  static async createUser(userInfo) {
    console.log(userInfo);
    const { email, password, first_name, last_name } = userInfo;
    const createdAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (email, password, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [email, hashedPassword, first_name, last_name, createdAt];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
}
module.exports = User;
