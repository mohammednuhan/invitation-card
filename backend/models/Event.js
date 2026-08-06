import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, default: "glass" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    venue: { type: String, default: "" },
    dressCode: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
