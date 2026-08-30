import { pool } from "../config/db.js";
import { DEFAULT_COUPLE } from "../utils/sampleData.js";

const mapCoupleRow = (row) => ({
  id: row.id,
  slug: row.slug,
  bride: {
    name: row.bride_name,
    fullName: row.bride_full_name,
    father: row.bride_father,
    image: row.bride_image
  },
  groom: {
    name: row.groom_name,
    fullName: row.groom_full_name,
    father: row.groom_father,
    image: row.groom_image
  },
  date: row.date,
  venueName: row.venue_name,
  venueAddress: row.venue_address,
  themeWord: row.theme_word,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const getCouple = async (req, res) => {
  try {
    const slug = req.params.slug || req.query.slug || "nuhan";
    let result = await pool.query("SELECT * FROM couples WHERE slug = $1", [slug]);
    let row = result.rows[0];

    if (!row) {
      const insert = await pool.query(
        `INSERT INTO couples (slug, bride_name, bride_full_name, bride_father, bride_image,
         groom_name, groom_full_name, groom_father, groom_image, date, venue_name, venue_address, theme_word)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
        [
          slug,
          DEFAULT_COUPLE.bride.name,
          DEFAULT_COUPLE.bride.fullName,
          DEFAULT_COUPLE.bride.father,
          DEFAULT_COUPLE.bride.image,
          DEFAULT_COUPLE.groom.name,
          DEFAULT_COUPLE.groom.fullName,
          DEFAULT_COUPLE.groom.father,
          DEFAULT_COUPLE.groom.image,
          DEFAULT_COUPLE.date || new Date("2026-12-20T12:00:00+05:30"),
          DEFAULT_COUPLE.venueName,
          DEFAULT_COUPLE.venueAddress,
          DEFAULT_COUPLE.themeWord
        ]
      );
      row = insert.rows[0];
    }

    if (!row.date) {
      await pool.query("UPDATE couples SET date = $1 WHERE id = $2", [
        new Date("2026-12-20T12:00:00+05:30"),
        row.id
      ]);
      row.date = new Date("2026-12-20T12:00:00+05:30");
    }

    res.json({ data: mapCoupleRow(row) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCouple = async (req, res) => {
  try {
    const slug = req.body.slug || "nuhan";
    let result = await pool.query("SELECT * FROM couples WHERE slug = $1", [slug]);
    let row = result.rows[0];

    if (!row) {
      const insert = await pool.query(
        "INSERT INTO couples (slug) VALUES ($1) RETURNING *",
        [slug]
      );
      row = insert.rows[0];
    }

    const b = req.body.bride || {};
    const g = req.body.groom || {};

    const updated = await pool.query(
      `UPDATE couples SET
        bride_name = COALESCE($1, bride_name),
        bride_full_name = COALESCE($2, bride_full_name),
        bride_father = COALESCE($3, bride_father),
        bride_image = COALESCE($4, bride_image),
        groom_name = COALESCE($5, groom_name),
        groom_full_name = COALESCE($6, groom_full_name),
        groom_father = COALESCE($7, groom_father),
        groom_image = COALESCE($8, groom_image),
        date = COALESCE($9, date),
        venue_name = COALESCE($10, venue_name),
        venue_address = COALESCE($11, venue_address),
        theme_word = COALESCE($12, theme_word),
        updated_at = NOW()
      WHERE id = $13 RETURNING *`,
      [
        b.name || null,
        b.fullName || null,
        b.father || null,
        b.image || null,
        g.name || null,
        g.fullName || null,
        g.father || null,
        g.image || null,
        req.body.date || null,
        req.body.venueName || null,
        req.body.venueAddress || null,
        req.body.themeWord || null,
        row.id
      ]
    );

    res.json({ data: mapCoupleRow(updated.rows[0]) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
