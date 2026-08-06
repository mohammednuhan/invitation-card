import Family from "../models/Family.js";

export const getFamily = async (req, res) => {
  try {
    const families = await Family.find().sort({ side: 1 });
    res.json({ data: families });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFamily = async (req, res) => {
  try {
    const { side, name, members } = req.body;
    if (!side) return res.status(400).json({ message: "Side is required" });

    let family = await Family.findOne({ side });
    if (!family) family = new Family({ side });

    if (name !== undefined) family.name = name;
    if (members) family.members = members;

    await family.save();
    res.json({ data: family });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
