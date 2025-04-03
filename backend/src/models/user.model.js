const { pool: dbPool } = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async getDB() {
    const conn = await dbPool.getConnection();
    return conn;
  }

  static async beginTransaction(conn) {
    await conn.beginTransaction();
    return conn;
  }

  static async commitTransaction(conn) {
    await conn.commit();
    conn.release();
  }

  static async rollbackTransaction(conn) {
    await conn.rollback();
    conn.release();
  }

  static async findByEmail(email) {
    const db = await this.getDB();
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async findById(id) {
    const db = await this.getDB();
    const [rows] = await db.execute("SELECT id, name, email, created_at FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async createUser(name, email, password, conn = null) {
    const shouldRelease = !conn;
    if (!conn) conn = await this.getDB();
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await conn.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
      
      if (shouldRelease) conn.release();
      return result;
    } catch (error) {
      if (shouldRelease) conn.release();
      throw error;
    }
  }

  static async getAllUsers() {
    const db = await this.getDB();
    const [rows] = await db.execute("SELECT id, name, email FROM users");
    return rows;
  }
}

module.exports = User;
