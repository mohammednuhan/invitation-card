import mongoose from "mongoose";

const CoupleSchema = new mongoose.Schema(
  {
    slug: { type: String, default: "nuhan", unique: true },
    bride: {
      name: { type: String, default: "" },
      fullName: { type: String, default: "" },
      father: { type: String, default: "" },
      image: { type: String, default: "" }
    },
    groom: {
      name: { type: String, default: "" },
      fullName: { type: String, default: "" },
      father: { type: String, default: "" },
      image: { type: String, default: "" }
    },
    date: { type: Date, default: null },
    venueName: { type: String, default: "" },
    venueAddress: { type: String, default: "" },
    themeWord: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Couple", CoupleSchema);
