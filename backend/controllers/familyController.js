import { pool } from "../config/db.js";

export const getFamily = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM families ORDER BY side ASC");
    const data = result.rows.map((r) => ({
      id: r.id,
      side: r.side,
      name: r.name,
      members: typeof r.members === "string" ? JSON.parse(r.members) : r.members,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFamily = async (req, res) => {
  try {
    const { side, name, members } = req.body;
    if (!side) return res.status(400).json({ message: "Side is required" });

    let result = await pool.query("SELECT * FROM families WHERE side = $1", [side]);
    let row = result.rows[0];

    if (!row) {
      const insert = await pool.query(
        "INSERT INTO families (side, name, members) VALUES ($1,$2,$3) RETURNING *",
        [side, name || "", JSON.stringify(members || [])]
      );
      row = insert.rows[0];
    } else {
      const updated = await pool.query(
        `UPDATE families SET
          name = COALESCE($1, name),
          members = COALESCE($2, members),
          updated_at = NOW()
        WHERE id = $3 RETURNING *`,
        [name || null, members ? JSON.stringify(members) : null, row.id]
      );
      row = updated.rows[0];
    }

    res.json({
      data: {
        id: row.id,
        side: row.side,
        name: row.name,
        members: typeof row.members === "string" ? JSON.parse(row.members) : row.members,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
