import Countdown from "../models/Countdown.js";

export const getCountdown = async (req, res) => {
  try {
    let item = await Countdown.findOne();
    if (!item) {
      item = await Countdown.create({ label: "We are waiting for you", enabled: true });
    }
    res.json({ data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCountdown = async (req, res) => {
  try {
    let item = await Countdown.findOne();
    if (!item) item = new Countdown();
    Object.assign(item, req.body);
    await item.save();
    res.json({ data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
