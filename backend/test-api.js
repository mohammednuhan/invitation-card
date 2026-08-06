import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import Couple from "./models/Couple.js";
import Story from "./models/Story.js";
import Event from "./models/Event.js";
import Venue from "./models/Venue.js";
import Family from "./models/Family.js";
import { DEFAULT_COUPLE, SAMPLE_STORY, SAMPLE_EVENTS } from "./utils/sampleData.js";
import app from "./app.js";

const run = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  await Admin.create({
    username: "admin",
    password: await bcrypt.hash("admin123", 10)
  });
  await Couple.create({ slug: "nuhan", ...DEFAULT_COUPLE, date: new Date("2026-12-20T12:00:00+05:30") });
  await Story.insertMany(SAMPLE_STORY);
  await Event.insertMany(SAMPLE_EVENTS);
  await Venue.create({ name: "Test Palace" });
  await Family.insertMany([
    { side: "bride", name: "Bride Family", members: [] },
    { side: "groom", name: "Groom Family", members: [] }
  ]);

  const server = app.listen(0);
  const base = `http://localhost:${server.address().port}/api`;

  let pass = 0;
  let fail = 0;
  const check = (name, cond) => {
    if (cond) {
      pass++;
      console.log(`PASS  ${name}`);
    } else {
      fail++;
      console.log(`FAIL  ${name}`);
    }
  };

  const loginRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" })
  });
  const loginData = await loginRes.json();
  check("POST /login returns token", loginRes.status === 200 && !!loginData.token);
  const token = loginData.token;
  const authHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const loginBad = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "wrong" })
  });
  check("POST /login rejects bad password", loginBad.status === 401);

  const couple = await fetch(`${base}/couple/nuhan`).then((r) => r.json());
  check("GET /couple/:slug returns couple", couple.data?.slug === "nuhan");

  const couplePut = await fetch(`${base}/couple`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({ slug: "nuhan", bride: { name: "Ariba Updated" } })
  }).then((r) => r.json());
  check("PUT /couple updates bride name", couplePut.data?.bride?.name === "Ariba Updated");

  const story = await fetch(`${base}/story`).then((r) => r.json());
  check("GET /story returns chapters", Array.isArray(story.data) && story.data.length === 2);

  const events = await fetch(`${base}/events`).then((r) => r.json());
  check("GET /events returns events", Array.isArray(events.data) && events.data.length === 5);

  const venue = await fetch(`${base}/venue`).then((r) => r.json());
  check("GET /venue returns venue", venue.data?.name === "Test Palace");
  const venuePut = await fetch(`${base}/venue`, { method: "PUT", headers: authHeaders, body: JSON.stringify({ name: "Updated Palace" }) }).then((r) => r.json());
  check("PUT /venue updates venue", venuePut.data?.name === "Updated Palace");

  const theme = await fetch(`${base}/theme`).then((r) => r.json());
  check("GET /theme returns theme", !!theme.data);

  console.log(`\n${pass} passed, ${fail} failed`);
  await mongoose.disconnect();
  await mongod.stop();
  server.close();
  process.exit(fail === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(1);
});
