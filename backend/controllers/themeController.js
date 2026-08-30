import { pool } from "../config/db.js";

const mapThemeRow = (r) => ({
  id: r.id,
  primary: r.primary_color,
  background: r.background_color,
  accent: r.accent_color
});

export const getTheme = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM themes LIMIT 1");
    if (result.rows.length === 0) {
      const insert = await pool.query(
        "INSERT INTO themes (primary_color, background_color, accent_color) VALUES ($1,$2,$3) RETURNING *",
        ["#d4a03c", "#fdf8ec", "#f0d48a"]
      );
      return res.json({ data: mapThemeRow(insert.rows[0]) });
    }
    res.json({ data: mapThemeRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTheme = async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM themes LIMIT 1");
    if (result.rows.length === 0) {
      const insert = await pool.query(
        "INSERT INTO themes (primary_color, background_color, accent_color) VALUES ($1,$2,$3) RETURNING *",
        [req.body.primary || "#d4a03c", req.body.background || "#fdf8ec", req.body.accent || "#f0d48a"]
      );
      result = { rows: insert.rows };
    } else {
      const updated = await pool.query(
        `UPDATE themes SET
          primary_color = COALESCE($1, primary_color),
          background_color = COALESCE($2, background_color),
          accent_color = COALESCE($3, accent_color)
        WHERE id = $4 RETURNING *`,
        [
          req.body.primary || null,
          req.body.background || null,
          req.body.accent || null,
          result.rows[0].id
        ]
      );
      result = updated;
    }
    res.json({ data: mapThemeRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
