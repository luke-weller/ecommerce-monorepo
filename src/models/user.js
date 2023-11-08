const { v4: uuidv4 } = require("uuid");
const pool = require("../../config/database");
const bcrypt = require("bcrypt");

class User {
  static async createUser(userInfo) {
    const { first_name, last_name, email, password } = userInfo;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [email, hashedPassword, first_name, last_name];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
