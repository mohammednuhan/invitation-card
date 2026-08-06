import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import Couple from "./models/Couple.js";
import Story from "./models/Story.js";
import Event from "./models/Event.js";
import Countdown from "./models/Countdown.js";
import Venue from "./models/Venue.js";
import Family from "./models/Family.js";
import Theme from "./models/Theme.js";
import {
  DEFAULT_COUPLE,
  SAMPLE_STORY,
  SAMPLE_EVENTS,
  SAMPLE_FAMILY,
  SAMPLE_VENUE
} from "./utils/sampleData.js";

dotenv.config();

const clear = async () => {
  await Promise.all([
    Admin.deleteMany({}),
    Couple.deleteMany({}),
    Story.deleteMany({}),
    Event.deleteMany({}),
    Countdown.deleteMany({}),
    Venue.deleteMany({}),
    Family.deleteMany({}),
    Theme.deleteMany({})
  ]);
  console.log("Cleared existing data");
};

const seed = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  await clear();

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ username: username.toLowerCase(), password: hashed });
  console.log(`Admin created: ${username} / ${password}`);

  const weddingDate = new Date("2026-12-20T12:00:00+05:30");
  await Couple.create({
    slug: "nuhan",
    ...DEFAULT_COUPLE,
    date: weddingDate,
    bride: {
      ...DEFAULT_COUPLE.bride,
      image: "/images/bride.jpg"
    },
    groom: {
      ...DEFAULT_COUPLE.groom,
      image: "/images/groom.jpg"
    }
  });
  console.log("Couple seeded");

  const img = (n) => `/images/${n}`;
  const storyImgs = {
    Nikah: "story-4.jpg",
    Walima: "story-5.jpg"
  };
  for (const s of SAMPLE_STORY) {
    await Story.create({ ...s, image: img(storyImgs[s.title] || "story-1.jpg") });
  }
  console.log("Story seeded");

  for (const e of SAMPLE_EVENTS) await Event.create(e);
  console.log("Events seeded");

  await Countdown.create({ label: "We are waiting for you", targetDate: weddingDate, enabled: true });
  await Venue.create(SAMPLE_VENUE);
  await Family.insertMany(SAMPLE_FAMILY);
  await Theme.create({ primary: "#d4a03c", background: "#fdf8ec", accent: "#f0d48a" });
  console.log("Countdown, Venue, Family, Theme seeded");

  console.log("Seed complete! Starting the server now:");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
