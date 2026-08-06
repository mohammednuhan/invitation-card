import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { config } from "./config/index.js";

import authRoutes from "./routes/authRoutes.js";
import coupleRoutes from "./routes/coupleRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import countdownRoutes from "./routes/countdownRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) =>
  res.json({ status: "ok", service: "Luxury Wedding API" })
);

app.use("/api", authRoutes);
app.use("/api/couple", coupleRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/countdown", countdownRoutes);
app.use("/api/venue", venueRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/upload", uploadRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;
