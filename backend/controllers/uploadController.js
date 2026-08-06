import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const base =
      process.env.PUBLIC_BASE_URL ||
      `${config.clientUrl.replace(/\/$/, "")}`;
    const url = `${base}/uploads/${req.file.filename}`;
    res.status(201).json({ data: { url, filename: req.file.filename } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadDirPath = path.join(__dirname, "..", "uploads");
