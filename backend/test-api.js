import { pool } from "./config/db.js";
import app from "./app.js";

const run = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined. Run tests from backend/ with .env present.");
  }

  await pool.query("SELECT 1");

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
  const get = (path) => fetch(`${base}${path}`).then((r) => r.json());

  const health = await fetch(`${base.replace("/api", "")}/`).then((r) => r.json());
  check("GET / returns ok", health.status === "ok");

  const couple = await get("/couple/nuhan");
  check("GET /couple/:slug returns couple", couple.data?.slug === "nuhan");

  const coupleList = await get("/couple");
  check("GET /couple returns couple", !!coupleList.data);

  const story = await get("/story");
  check("GET /story returns array", Array.isArray(story.data));

  const events = await get("/events");
  check("GET /events returns array", Array.isArray(events.data));
  const nikah = (events.data || []).find((e) => e.title === "Nikah");
  check("Nikah venue is Koppa, Chikamagaluru", !!nikah && nikah.venue.includes("Koppa"));

  const venue = await get("/venue");
  check("GET /venue returns venue", !!venue.data);

  const family = await get("/family");
  check("GET /family returns array", Array.isArray(family.data));

  const theme = await get("/theme");
  check("GET /theme returns theme", !!theme.data);

  const countdown = await get("/countdown");
  check("GET /countdown returns countdown", !!countdown.data);

  const loginRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" })
  });
  const loginData = await loginRes.json();
  check("POST /login returns token", loginRes.status === 200 && !!loginData.token);

  const loginBad = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "wrong" })
  });
  check("POST /login rejects bad password", loginBad.status === 401);

  const meRes = await fetch(`${base}/me`, {
    headers: { Authorization: `Bearer ${loginData.token}` }
  });
  check("GET /me with token", meRes.status === 200);

  const meNoAuth = await fetch(`${base}/me`);
  check("GET /me without token is rejected", meNoAuth.status === 401);

  console.log(`\n${pass} passed, ${fail} failed`);
  await pool.end();
  server.close();
  process.exit(fail === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(1);
});