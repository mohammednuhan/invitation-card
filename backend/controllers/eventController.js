import { pool } from "../config/db.js";

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY created_at ASC");
    const data = result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      icon: r.icon,
      date: r.date,
      time: r.time,
      venue: r.venue,
      dressCode: r.dress_code,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { title, icon, date, time, venue, dressCode } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const result = await pool.query(
      "INSERT INTO events (title, icon, date, time, venue, dress_code) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, icon || "glass", date || "", time || "", venue || "", dressCode || ""]
    );
    const r = result.rows[0];
    res.status(201).json({
      data: {
        id: r.id,
        title: r.title,
        icon: r.icon,
        date: r.date,
        time: r.time,
        venue: r.venue,
        dressCode: r.dress_code,
        createdAt: r.created_at,
        updatedAt: r.updated_at
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, icon, date, time, venue, dressCode } = req.body;
    const result = await pool.query(
      `UPDATE events SET
        title = COALESCE($1, title),
        icon = COALESCE($2, icon),
        date = COALESCE($3, date),
        time = COALESCE($4, time),
        venue = COALESCE($5, venue),
        dress_code = COALESCE($6, dress_code),
        updated_at = NOW()
      WHERE id = $7 RETURNING *`,
      [title || null, icon || null, date || null, time || null, venue || null, dressCode || null, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: "Event not found" });
    const r = result.rows[0];
    res.json({
      data: {
        id: r.id,
        title: r.title,
        icon: r.icon,
        date: r.date,
        time: r.time,
        venue: r.venue,
        dressCode: r.dress_code,
        createdAt: r.created_at,
        updatedAt: r.updated_at
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING *", [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
