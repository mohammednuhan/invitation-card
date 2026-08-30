import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import { config } from "../config/index.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const result = await pool.query("SELECT * FROM admins WHERE username = $1", [
      username.toLowerCase()
    ]);
    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id }, config.jwtSecret, {
      expiresIn: "7d"
    });

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin.id, username: admin.username }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const me = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, created_at, updated_at FROM admins WHERE id = $1",
      [req.adminId]
    );
    const admin = result.rows[0];
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
