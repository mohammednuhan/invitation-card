import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  primary: { type: String, default: "#d4a03c" },
  background: { type: String, default: "#fdf8ec" },
  accent: { type: String, default: "#f0d48a" }
});

export default mongoose.model("Theme", ThemeSchema);
