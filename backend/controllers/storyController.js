import Story from "../models/Story.js";

export const getStory = async (req, res) => {
  try {
    const items = await Story.find().sort({ createdAt: 1 });
    res.json({ data: items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addStory = async (req, res) => {
  try {
    const { title, date, text, image } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const item = await Story.create({ title, date, text, image });
    res.status(201).json({ data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStory = async (req, res) => {
  try {
    const item = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!item) return res.status(404).json({ message: "Chapter not found" });
    res.json({ data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const item = await Story.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Chapter not found" });
    res.json({ message: "Chapter deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
