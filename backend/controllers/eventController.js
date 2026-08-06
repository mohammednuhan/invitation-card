import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const items = await Event.find().sort({ createdAt: 1 });
    res.json({ data: items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { title, icon, date, time, venue, dressCode } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const item = await Event.create({ title, icon, date, time, venue, dressCode });
    res.status(201).json({ data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const item = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!item) return res.status(404).json({ message: "Event not found" });
    res.json({ data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const item = await Event.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
