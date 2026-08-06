import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  address: { type: String, default: "" },
  landmark: { type: String, default: "" },
  parking: { type: String, default: "" },
  mapEmbed: { type: String, default: "" },
  mapsLink: { type: String, default: "" }
});

export default mongoose.model("Venue", VenueSchema);
