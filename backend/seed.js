import pg from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  DEFAULT_COUPLE,
  SAMPLE_STORY,
  SAMPLE_EVENTS,
  SAMPLE_FAMILY,
  SAMPLE_VENUE
} from "./utils/sampleData.js";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const createSchema = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS couples (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE DEFAULT 'nuhan',
      bride_name VARCHAR(255) DEFAULT '',
      bride_full_name VARCHAR(255) DEFAULT '',
      bride_father VARCHAR(255) DEFAULT '',
      bride_image VARCHAR(500) DEFAULT '',
      groom_name VARCHAR(255) DEFAULT '',
      groom_full_name VARCHAR(255) DEFAULT '',
      groom_father VARCHAR(255) DEFAULT '',
      groom_image VARCHAR(500) DEFAULT '',
      date TIMESTAMP,
      venue_name VARCHAR(255) DEFAULT '',
      venue_address TEXT DEFAULT '',
      theme_word VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS stories (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date VARCHAR(255) DEFAULT '',
      text TEXT DEFAULT '',
      image VARCHAR(500) DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      icon VARCHAR(255) DEFAULT 'glass',
      date VARCHAR(255) DEFAULT '',
      time VARCHAR(255) DEFAULT '',
      venue TEXT DEFAULT '',
      dress_code VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS countdowns (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) DEFAULT 'We are waiting for you',
      target_date TIMESTAMP,
      enabled BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS venues (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) DEFAULT '',
      address TEXT DEFAULT '',
      landmark TEXT DEFAULT '',
      parking TEXT DEFAULT '',
      map_embed TEXT DEFAULT '',
      maps_link TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS families (
      id SERIAL PRIMARY KEY,
      side VARCHAR(50) NOT NULL,
      name VARCHAR(255) DEFAULT '',
      members JSONB DEFAULT '[]',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS themes (
      id SERIAL PRIMARY KEY,
      primary_color VARCHAR(50) DEFAULT '#d4a03c',
      background_color VARCHAR(50) DEFAULT '#fdf8ec',
      accent_color VARCHAR(50) DEFAULT '#f0d48a',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Database schema created");
};

const clearAll = async () => {
  await pool.query("DELETE FROM admins");
  await pool.query("DELETE FROM couples");
  await pool.query("DELETE FROM stories");
  await pool.query("DELETE FROM events");
  await pool.query("DELETE FROM countdowns");
  await pool.query("DELETE FROM venues");
  await pool.query("DELETE FROM families");
  await pool.query("DELETE FROM themes");
  console.log("Cleared existing data");
};

const seed = async () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  await createSchema();
  await clearAll();

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO admins (username, password) VALUES ($1, $2)", [
    username.toLowerCase(),
    hashed
  ]);
  console.log(`Admin created: ${username} / ${password}`);

  const weddingDate = new Date("2026-12-20T12:00:00+05:30");
  await pool.query(
    `INSERT INTO couples (slug, bride_name, bride_full_name, bride_father, bride_image,
     groom_name, groom_full_name, groom_father, groom_image, date, venue_name, venue_address, theme_word)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
    [
      "nuhan",
      DEFAULT_COUPLE.bride.name,
      DEFAULT_COUPLE.bride.fullName,
      DEFAULT_COUPLE.bride.father,
      "/images/bride.jpg",
      DEFAULT_COUPLE.groom.name,
      DEFAULT_COUPLE.groom.fullName,
      DEFAULT_COUPLE.groom.father,
      "/images/groom.jpg",
      weddingDate,
      DEFAULT_COUPLE.venueName,
      DEFAULT_COUPLE.venueAddress,
      DEFAULT_COUPLE.themeWord
    ]
  );
  console.log("Couple seeded");

  const img = (n) => `/images/${n}`;
  const storyImgs = { Nikah: "story-4.jpg", Walima: "story-5.jpg" };
  for (const s of SAMPLE_STORY) {
    await pool.query(
      "INSERT INTO stories (title, date, text, image) VALUES ($1,$2,$3,$4)",
      [s.title, s.date, s.text, img(storyImgs[s.title] || "story-1.jpg")]
    );
  }
  console.log("Story seeded");

  for (const e of SAMPLE_EVENTS) {
    await pool.query(
      "INSERT INTO events (title, icon, date, time, venue, dress_code) VALUES ($1,$2,$3,$4,$5,$6)",
      [e.title, e.icon, e.date, e.time, e.venue, e.dressCode]
    );
  }
  console.log("Events seeded");

  await pool.query(
    "INSERT INTO countdowns (label, target_date, enabled) VALUES ($1,$2,$3)",
    ["We are waiting for you", weddingDate, true]
  );

  await pool.query(
    "INSERT INTO venues (name, address, landmark, parking, map_embed, maps_link) VALUES ($1,$2,$3,$4,$5,$6)",
    [
      SAMPLE_VENUE.name,
      SAMPLE_VENUE.address,
      SAMPLE_VENUE.landmark,
      SAMPLE_VENUE.parking,
      SAMPLE_VENUE.mapEmbed,
      SAMPLE_VENUE.mapsLink
    ]
  );

  for (const f of SAMPLE_FAMILY) {
    await pool.query(
      "INSERT INTO families (side, name, members) VALUES ($1,$2,$3)",
      [f.side, f.name, JSON.stringify(f.members)]
    );
  }

  await pool.query(
    "INSERT INTO themes (primary_color, background_color, accent_color) VALUES ($1,$2,$3)",
    ["#d4a03c", "#fdf8ec", "#f0d48a"]
  );

  console.log("Countdown, Venue, Family, Theme seeded");
  console.log("Seed complete!");

  await pool.end();
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
