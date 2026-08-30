# Deployment Guide

The whole application (frontend **and** backend) deploys to a single **Vercel** project. The static React app is served from `frontend/dist`, and the Express API runs as a Vercel Serverless Function under `/api/*`. Data lives in **MongoDB Atlas**.

This is a one-time, ~10 minute setup.

## 1. Database (MongoDB Atlas)

1. Go to https://www.mongodb.com/atlas and create a free account.
2. Create a new **M0 (free)** cluster.
3. Under *Database Access* create a database user (e.g. `wedding_user`) with a strong password.
4. Under *Network Access* allow access from `0.0.0.0/0` (anywhere) for simplicity.
5. Click **Connect** -> **Drivers** -> copy the connection string:

```
mongodb+srv://wedding_user:<password>@<cluster>.mongodb.net/wedding?retryWrites=true&w=majority
```

Keep this string safe - it becomes `MONGO_URI`.

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
3. Leave **Root Directory** at the repository root. `vercel.json` already sets the build command (`npm run build`), output directory (`frontend/dist`) and the `/api` rewrite.
4. Click **Deploy**. The first build takes a few minutes.

After it finishes you get a URL, e.g. `https://your-app.vercel.app`.

## 4. Add environment variables

In Vercel: **Project -> Settings -> Environment Variables**, add to **Production**, **Preview** and **Development**:

| Name             | Example                                                     | Required |
| ---------------- | ----------------------------------------------------------- | -------- |
| `MONGO_URI`      | `mongodb+srv://wedding_user:...@cluster.mongodb.net/wedding` | Yes      |
| `JWT_SECRET`     | long random string (see below)                              | Yes      |
| `ADMIN_USERNAME` | `admin`                                                     | Seed only |
| `ADMIN_PASSWORD` | a strong password                                           | Seed only |
| `CLIENT_URL`     | `https://your-app.vercel.app`                               | No       |
| `PUBLIC_BASE_URL`| `https://your-app.vercel.app`                               | No       |
| `VITE_API_URL`   | leave empty (defaults to same-origin `/api`)                | No       |

Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Then click **Redeploy** so the build picks up the new variables.

## 5. Seed the database (once)

Run this locally from the repository root (or from the Render shell if you use the backend separately). It creates the admin account and the sample invitation content:

```powershell
# PowerShell
$env:MONGO_URI="mongodb+srv://wedding_user:<password>@cluster.mongodb.net/wedding"
$env:ADMIN_USERNAME="admin"
$env:ADMIN_PASSWORD="<your strong password>"
npm run seed
```

```bash
# macOS / Linux / Git Bash
MONGO_URI="mongodb+srv://..." ADMIN_USERNAME=admin ADMIN_PASSWORD="..." npm run seed
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
- Any change in MongoDB shows up instantly on the live site.

> **Image uploads on Vercel:** Vercel functions have an ephemeral filesystem, so images uploaded through the admin panel are stored in MongoDB only as a URL and the file itself does **not** persist across function cold starts/redeploys. For permanent images, put your photos in `frontend/public/images/` (served as `/images/...`) and reference them there, or use them from the pre-seeded sample data. Text/date/venue/links all persist normally.

## Alternative: backend on Render (not required)

If you prefer a separate always-on backend, keep `render.yaml` and `frontend/vercel.json` and deploy the `backend/` folder as a Render Web Service (see the Render dashboard -> Blueprint -> this repo). Then set `VITE_API_URL=https://<your-backend>.onrender.com/api` in Vercel before building.

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| API returns 404 for `/api/...` | Ensure `vercel.json` (repo root) is present with the `/api/(.*)` rewrite and redeploy. |
| `MONGO_URI is not set` error | Add `MONGO_URI` to Vercel env vars and redeploy. |
| Admin login fails | Run the seed step (Section 5) - the login checks the admin stored in MongoDB. |
| Map not showing | Replace `VENUE.mapEmbed` in the admin Venue tab with a fresh Google Maps embed URL (Share -> Embed a map). |
| PWA banner not appearing | Service workers require HTTPS (Vercel provides it automatically). Ensure `manifest.webmanifest` and `public/icons/*` exist (they do). |
| Changes not reflected | MongoDB updates are instant; only redeploy when you change env vars, code or `public/` files. |
