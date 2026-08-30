import { pool } from "../config/db.js";

const mapCountdownRow = (r) => ({
  id: r.id,
  label: r.label,
  targetDate: r.target_date,
  enabled: r.enabled
});

export const getCountdown = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM countdowns LIMIT 1");
    if (result.rows.length === 0) {
      const insert = await pool.query(
        "INSERT INTO countdowns (label, target_date, enabled) VALUES ($1,$2,$3) RETURNING *",
        ["We are waiting for you", null, true]
      );
      return res.json({ data: mapCountdownRow(insert.rows[0]) });
    }
    res.json({ data: mapCountdownRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCountdown = async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM countdowns LIMIT 1");
    let row = result.rows[0];

    if (!row) {
      const insert = await pool.query(
        "INSERT INTO countdowns (label, target_date, enabled) VALUES ($1,$2,$3) RETURNING *",
        [req.body.label || "We are waiting for you", req.body.targetDate || null, req.body.enabled ?? true]
      );
      row = insert.rows[0];
    } else {
      const updated = await pool.query(
        `UPDATE countdowns SET
          label = COALESCE($1, label),
          target_date = COALESCE($2, target_date),
          enabled = COALESCE($3, enabled),
          updated_at = NOW()
        WHERE id = $4 RETURNING *`,
        [
          req.body.label || null,
          req.body.targetDate || null,
          req.body.enabled != null ? req.body.enabled : null,
          row.id
        ]
      );
      row = updated.rows[0];
    }

    res.json({ data: mapCountdownRow(row) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
