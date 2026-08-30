import mongoose from "mongoose";
import app from "../backend/app.js";

let connPromise = null;

async function connect() {
  if (mongoose.connection.readyState === 1) return;
  if (!connPromise) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set. Add it to the Vercel project environment.");
    }
    connPromise = mongoose.connect(uri, { bufferCommands: false });
  }
  await connPromise;
}

export default async function handler(req, res) {
  try {
    await connect();
  } catch (err) {
    connPromise = null;
    console.error("MongoDB connection failed:", err.message);
    res.status(500).json({ message: "Database connection failed" });
    return;
  }
  return app(req, res);
}
