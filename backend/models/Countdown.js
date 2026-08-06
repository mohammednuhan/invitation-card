import mongoose from "mongoose";

const CountdownSchema = new mongoose.Schema({
  label: { type: String, default: "We are waiting for you" },
  targetDate: { type: Date, default: null },
  enabled: { type: Boolean, default: true }
});

export default mongoose.model("Countdown", CountdownSchema);
