import { pool } from "../config/db.js";

export const getStory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stories ORDER BY created_at ASC");
    const data = result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      date: r.date,
      text: r.text,
      image: r.image,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addStory = async (req, res) => {
  try {
    const { title, date, text, image } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const result = await pool.query(
      "INSERT INTO stories (title, date, text, image) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, date || "", text || "", image || ""]
    );
    const r = result.rows[0];
    res.status(201).json({
      data: { id: r.id, title: r.title, date: r.date, text: r.text, image: r.image, createdAt: r.created_at, updatedAt: r.updated_at }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStory = async (req, res) => {
  try {
    const { title, date, text, image } = req.body;
    const result = await pool.query(
      `UPDATE stories SET
        title = COALESCE($1, title),
        date = COALESCE($2, date),
        text = COALESCE($3, text),
        image = COALESCE($4, image),
        updated_at = NOW()
      WHERE id = $5 RETURNING *`,
      [title || null, date || null, text || null, image || null, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: "Chapter not found" });
    const r = result.rows[0];
    res.json({
      data: { id: r.id, title: r.title, date: r.date, text: r.text, image: r.image, createdAt: r.created_at, updatedAt: r.updated_at }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM stories WHERE id = $1 RETURNING *", [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ message: "Chapter not found" });
    res.json({ message: "Chapter deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
