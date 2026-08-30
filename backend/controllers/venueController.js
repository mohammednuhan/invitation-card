import { pool } from "../config/db.js";

const mapVenueRow = (r) => ({
  id: r.id,
  name: r.name,
  address: r.address,
  landmark: r.landmark,
  parking: r.parking,
  mapEmbed: r.map_embed,
  mapsLink: r.maps_link
});

export const getVenue = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM venues LIMIT 1");
    if (result.rows.length === 0) {
      const insert = await pool.query(
        "INSERT INTO venues (name, address, landmark, parking, map_embed, maps_link) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        ["", "", "", "", "", ""]
      );
      return res.json({ data: mapVenueRow(insert.rows[0]) });
    }
    res.json({ data: mapVenueRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVenue = async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM venues LIMIT 1");
    let row = result.rows[0];

    if (!row) {
      const insert = await pool.query(
        "INSERT INTO venues (name, address, landmark, parking, map_embed, maps_link) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [
          req.body.name || "",
          req.body.address || "",
          req.body.landmark || "",
          req.body.parking || "",
          req.body.mapEmbed || "",
          req.body.mapsLink || ""
        ]
      );
      row = insert.rows[0];
    } else {
      const updated = await pool.query(
        `UPDATE venues SET
          name = COALESCE($1, name),
          address = COALESCE($2, address),
          landmark = COALESCE($3, landmark),
          parking = COALESCE($4, parking),
          map_embed = COALESCE($5, map_embed),
          maps_link = COALESCE($6, maps_link),
          updated_at = NOW()
        WHERE id = $7 RETURNING *`,
        [
          req.body.name || null,
          req.body.address || null,
          req.body.landmark || null,
          req.body.parking || null,
          req.body.mapEmbed || null,
          req.body.mapsLink || null,
          row.id
        ]
      );
      row = updated.rows[0];
    }

    res.json({ data: mapVenueRow(row) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
