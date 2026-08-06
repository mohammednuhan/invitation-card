import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, default: "" },
    text: { type: String, default: "" },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Story", StorySchema);
