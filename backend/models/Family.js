import mongoose from "mongoose";

const FamilySchema = new mongoose.Schema(
  {
    side: { type: String, enum: ["bride", "groom"], required: true },
    name: { type: String, default: "" },
    members: [
      {
        relation: { type: String, default: "" },
        name: { type: String, default: "" },
        image: { type: String, default: "" }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Family", FamilySchema);
