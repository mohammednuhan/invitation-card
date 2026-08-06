# Deployment Guide

This guide walks you through deploying the Luxury Wedding Invitation to production:
- **Frontend** -> Vercel
- **Backend** -> Render
- **Database** -> MongoDB Atlas

## 1. Database (MongoDB Atlas)

1. Go to https://www.mongodb.com/atlas and create a free account.
2. Create a new **M0 (free)** cluster.
3. Under *Database Access* create a database user (e.g. `wedding_user`) with a strong password.
4. Under *Network Access* allow access: `0.0.0.0/0` (anywhere) for simplicity.
5. Click **Connect** -> **Drivers** -> copy the connection string:

```
mongodb+srv://wedding_user:<password>@<cluster>.mongodb.net/wedding?retryWrites=true&w=majority
```

Keep this string safe - it goes into `MONGO_URI`.

## 2. Backend (Render)

### Option A - Render Blueprint (recommended)

1. Push the project to a GitHub repository.
2. On Render: **New** -> **Blueprint**, connect the repo.
3. Render reads `render.yaml` and creates the service.
4. Fill in the environment variables (Render asks for the ones marked `sync: false`):
   - `MONGO_URI` - your Atlas connection string
   - `JWT_SECRET` - a long random string
   - `ADMIN_PASSWORD` - a strong admin password
   - `CLIENT_URL` - your frontend URL once Vercel is ready (e.g. `https://your-app.vercel.app`)
   - `PUBLIC_BASE_URL` - your backend URL (e.g. `https://your-backend.onrender.com`)

### Option B - Manual

1. On Render: **New** -> **Web Service**, connect your repo.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm run start`
5. Add the same environment variables listed above.
6. Deploy. Note the final URL, e.g. `https://luxury-wedding-backend.onrender.com`.

### Run the seed after first deploy

Once the backend is live, run the seed once to create the admin account and sample content:

```bash
MONGO_URI=<your-atlas-uri> ADMIN_USERNAME=admin ADMIN_PASSWORD=<your-password> node seed.js
```

(run this locally from the `backend` folder, or use the Render shell)

## 3. Frontend (Vercel)

1. Push the project to GitHub.
2. On Vercel: **New Project**, import the repo.
3. **Root directory:** `frontend`
4. Framework preset: **Vite** (Vercel auto-detects).
5. Build command: `npm run build`, Output directory: `dist`.
6. Environment variables:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
7. Deploy.

`frontend/vercel.json` already contains the SPA rewrite so `/nuhan`, `/admin` etc. all resolve correctly.

### Custom domain

If you own `mywedding.com`, add it in Vercel under your project **Settings -> Domains**.
Your invitation will live at `https://mywedding.com/nuhan`.

## 4. Post-deploy checklist

- [ ] Open the invitation URL - the opening screen should play and the button should work.
- [ ] Admin login works at `/admin`.
- [ ] Upload an image in the Story tab through the admin panel and confirm the file is served from `/uploads/`.
- [ ] Update the couple date and confirm the countdown changes.
- [ ] HTTPS is active on both frontend and backend.
- [ ] PWA works: open the URL in Chrome, install it ("Install App" banner), then reopen it full-screen with the wedding icon. Verify it loads offline (airplane mode).
- [ ] Lighthouse shows the app is installable (`manifest.webmanifest` + service worker are served).

## 5. Troubleshooting

| Problem | Fix |
| ------ | --- |
| Uploads 404 | Ensure `PUBLIC_BASE_URL` is set to the backend URL; uploaded files are served at `{PUBLIC_BASE_URL}/uploads/...`. |
| Images broken on Vercel | Keep photos inside `frontend/public/images/` and reference them as `/images/...`. |
| Admin login fails | Run `npm run seed` again, or check `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars match the seeded values. |
| Map not showing | Replace `VENUE.mapEmbed` in the admin Venue tab with a fresh Google Maps embed URL (Share -> Embed a map). |
| PWA banner not appearing | The service worker only activates over HTTPS (or localhost). Make sure `VITE_API_URL` is set at build time and re-deploy; the install banner needs a valid `manifest.webmanifest` and icons in `public/icons/`. |

## 6. Updating content in production

Everything is editable live through the admin panel at `/admin` - no redeploy needed:

- Couple names, photos and date -> Couple tab
- Story chapters -> Story tab
- Events -> Events tab
- Venue / map -> Venue tab
