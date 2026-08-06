import Venue from "../models/Venue.js";

export const getVenue = async (req, res) => {
  try {
    let venue = await Venue.findOne();
    if (!venue) {
      venue = await Venue.create({
        name: "",
        address: "",
        landmark: "",
        parking: "",
        mapEmbed: "",
        mapsLink: ""
      });
    }
    res.json({ data: venue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVenue = async (req, res) => {
  try {
    let venue = await Venue.findOne();
    if (!venue) venue = new Venue();
    Object.assign(venue, req.body);
    await venue.save();
    res.json({ data: venue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
