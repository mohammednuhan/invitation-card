# Deployment Guide

The whole application (frontend **and** backend) deploys to a single **Vercel** project. The static React app is served from `frontend/dist`, and the Express API runs as a Vercel Serverless Function under `/api/*`. Data lives in a **PostgreSQL** database (this project uses **Neon** serverless Postgres). The backend talks to Postgres directly through `pg` — the old Mongo/mongoose files (`backend/models/*`, `api/index.js`) have been removed/replaced.

This is a one-time, ~10 minute setup.

## 1. Database (Neon Postgres)

1. Go to https://neon.tech and create a free account.
2. Create a project (choose a region close to your audience).
3. Copy the **pooled** connection string:

```
postgresql://neondb_owner:<password>@ep-<id>-pooler.<region>.aws.neon.tech/neondb?sslmode=require
```

Keep this string safe — it becomes `DATABASE_URL`.

## 2. Push the code to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 3. Create the Vercel project

1. Go to https://vercel.com/new and import your GitHub repo.
2. **Framework preset:** Vite (auto-detected).
3. Leave **Root Directory** at the repository root. `vercel.json` already sets the build command (`npm run build`), output directory (`frontend/dist`) and the `/api`, `/uploads` rewrites.
4. Click **Deploy**. The first build takes a few minutes.

After it finishes you get a URL, e.g. `https://your-app.vercel.app`.

## 4. Add environment variables

In Vercel: **Project -> Settings -> Environment Variables**, add to **Production**, **Preview** and **Development**:

| Name             | Example                                                        | Required |
| ---------------- | -------------------------------------------------------------- | -------- |
| `DATABASE_URL`   | `postgresql://...@ep-...pooler...neon.tech/neondb?sslmode=require` | Yes      |
| `JWT_SECRET`     | long random string (see below)                                 | Yes      |
| `ADMIN_USERNAME` | `admin`                                                        | Seed only |
| `ADMIN_PASSWORD` | a strong password                                              | Seed only |
| `CLIENT_URL`     | `https://your-app.vercel.app`                                  | No       |
| `PUBLIC_BASE_URL`| `https://your-app.vercel.app`                                  | No       |
| `VITE_API_URL`   | leave empty (defaults to same-origin `/api`)                   | No       |

Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Then click **Redeploy** so the build picks up the new variables.

> The serverless entry `api/index.js` imports the shared `pg` pool (`backend/config/db.js`). The pool is created lazily and validated once per warm instance, then re-used — so connections stay warm across requests. Make sure `DATABASE_URL` is set **before** the first request (it is read at function warm-up).

## 5. Seed the database (once)

Run this locally from the repository root (or from a Neon SQL console). It creates the admin account and the sample invitation content:

```powershell
# PowerShell (from backend/)
$env:DATABASE_URL="postgresql://...your-neon-string..."
$env:ADMIN_USERNAME="admin"
$env:ADMIN_PASSWORD="<your strong password>"
npm run seed
```

```bash
# macOS / Linux / Git Bash
DATABASE_URL="postgresql://..." ADMIN_USERNAME=admin ADMIN_PASSWORD="..." npm run seed
```

## 6. Done - test it

- Invitation: `https://your-app.vercel.app/nuhan`
- Admin panel: `https://your-app.vercel.app/admin` (login `admin` / your password)
- API health: `https://your-app.vercel.app/api/` returns `{ status: "ok", service: "Luxury Wedding API" }`
- PWA: open the invitation on your phone in Chrome -> "Install App" -> opens full-screen.

### Custom domain

Add it under **Project -> Settings -> Domains**. The invitation lives at `https://yourdomain.com/nuhan`.

## 7. Updating content in production

Everything is editable live through the admin panel at `/admin` - no redeploy needed:

- Couple names, photos and date -> Couple tab
- Story chapters -> Story tab
- Events -> Events tab
- Venue / map -> Venue tab
- Any change in Postgres shows up instantly on the live site.

> **Image uploads on Vercel:** Vercel functions have an ephemeral filesystem, so images uploaded through the admin panel are stored only as a URL and the file itself does **not** persist across function cold starts/redeploys. For permanent images, put your photos in `frontend/public/images/` (served as `/images/...`) and reference them there. Text/date/venue/links all persist normally.

## 8. Running the tests

```bash
# Backend API smoke tests (requires backend/.env with DATABASE_URL)
npm --prefix backend run test

# Frontend production build (verifies it compiles)
npm run build
```

## Alternative: backend on Render (not required)

If you prefer a separate always-on backend, keep `render.yaml` and deploy the `backend/` folder as a Render Web Service (Render dashboard -> Blueprint -> this repo). `render.yaml` already expects `DATABASE_URL`. Then set `VITE_API_URL=https://<your-backend>.onrender.com/api` in Vercel before building.

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| API returns 404 for `/api/...` | Ensure `vercel.json` (repo root) is present with the `/api/(.*)` rewrite and redeploy. |
| `DATABASE_URL is not defined` / "Database connection failed" | Add `DATABASE_URL` to Vercel env vars and redeploy. |
| Admin login fails | Run the seed step (Section 5) - the login checks the admin stored in Postgres. |
| Map not showing | Replace `VENUE.mapEmbed` in the admin Venue tab with a fresh Google Maps embed URL (Share -> Embed a map). |
| PWA banner not appearing | Service workers require HTTPS (Vercel provides it automatically). Ensure `manifest.webmanifest` and `public/icons/*` exist (they do). |
| Changes not reflected | Postgres updates are instant; only redeploy when you change env vars, code or `public/` files. |