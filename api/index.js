import { pool } from "../backend/config/db.js";
import app from "../backend/app.js";

let readyPromise = null;

async function ensureReady() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add it to the Vercel project environment."
    );
  }
  if (!readyPromise) {
    readyPromise = pool.query("SELECT 1").catch((err) => {
      readyPromise = null;
      throw err;
    });
  }
  await readyPromise;
}

export default async function handler(req, res) {
  try {
    await ensureReady();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    res.status(500).json({ message: "Database connection failed" });
    return;
  }
  return app(req, res);
}