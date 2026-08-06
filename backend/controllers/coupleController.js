import Couple from "../models/Couple.js";
import { DEFAULT_COUPLE } from "../utils/sampleData.js";

export const getCouple = async (req, res) => {
  try {
    const slug = req.params.slug || req.query.slug || "nuhan";
    let couple = await Couple.findOne({ slug });
    if (!couple) {
      couple = new Couple({ slug, ...DEFAULT_COUPLE });
      await couple.save();
    }
    if (!couple.date) {
      couple.date = DEFAULT_COUPLE.date;
      await couple.save();
    }
    res.json({ data: couple });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCouple = async (req, res) => {
  try {
    const slug = req.body.slug || "nuhan";
    let couple = await Couple.findOne({ slug });
    if (!couple) couple = new Couple({ slug });

    Object.assign(couple, {
      bride: { ...couple.bride, ...req.body.bride },
      groom: { ...couple.groom, ...req.body.groom },
      date: req.body.date || couple.date,
      venueName: req.body.venueName || couple.venueName,
      venueAddress: req.body.venueAddress || couple.venueAddress,
      themeWord: req.body.themeWord || couple.themeWord
    });

    await couple.save();
    res.json({ data: couple });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
