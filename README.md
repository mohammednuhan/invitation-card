# Luxury Wedding Invitation

A premium, luxury, interactive digital wedding invitation website - the kind that goes viral on Instagram. It opens with a magical loading sequence (Bismillah -> couple names -> "Open Invitation"), then reveals a full animated wedding experience with a **scratch-to-reveal** coin, story timeline, events, countdown, floating WhatsApp/share buttons and a complete admin panel.

**Stack:** React 19 - Vite - TailwindCSS - Framer Motion - GSAP - Lenis - canvas-confetti - Node.js - Express - PostgreSQL - `pg` - JWT - Multer

## Features

### Guest experience
- **Magical opening screen** - golden particles, falling petals, Bismillah calligraphy, couple names, "Open Invitation" button
- **Luxury hero** with bride/groom photos, wedding date, live countdown, venue, scroll indicator
- **Scratch-to-reveal coin** - scratch the golden coin to reveal the couple photo with confetti + glow
- **Our Story** animated alternating timeline
- **Wedding Events** - Nikah, Reception, Haldi, Mehendi, Walima luxury cards
- **Large realtime countdown** (days / hours / minutes / seconds)
- **Family** cards for bride and groom
- **Venue** with embedded Google Map + Get Directions
- **Thank You** closing section
- Floating WhatsApp, Share, Copy-link, Add-to-Google-Calendar, download `.ics` reminder
- **Progressive Web App (PWA)** - installable on Android/iOS home screen, opens full-screen like a native app, works offline after first visit, with an in-app "Add to phone" prompt
- Lenis smooth scroll, GSAP parallax, page transitions, lazy images, code splitting, service-worker caching, preloaded hero images

### Admin panel (`/admin`)
- Secure JWT login
- Manage couple (names, photos, wedding date)
- Upload photos (Multer) for the story and couple
- Manage events, story chapters, venue
- Everything editable from one dashboard

## Quick Start (local development)

### 1. Prerequisites
- Node.js 18+ (LTS recommended)
- A PostgreSQL database (local Postgres, a free [Neon](https://neon.tech) serverless cluster, or any hosted Postgres)

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Configure environment

**Backend** - `backend/.env` (copy from `backend/.env.example`):

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>.neon.tech/neondb?sslmode=require
JWT_SECRET=<long random string>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:5173
PUBLIC_BASE_URL=http://localhost:5000
```

**Frontend** - `frontend/.env` (copy from `frontend/.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

> Note: `VITE_API_URL` is used at build time (it adds a `preconnect` hint to the API server). In production, set it to your deployed backend URL before building.

### 4. Seed sample data (creates admin + default content)

```bash
npm run seed
```

### 5. Run both servers

```bash
npm run dev
```

- Frontend: http://localhost:5173 (the invitation opens at **http://localhost:5173/nuhan**)
- Backend: http://localhost:5000
- Admin: http://localhost:5173/admin (login: `admin` / `admin123`)

> Change the default admin password in `backend/.env` before going live!

## Project Structure

```
.
├── frontend/                     # React 19 + Vite app
│   ├── public/
│   │   ├── images/                # bride, groom, story, patterns, QR
│   │   └── icons/                 # PWA icons (192, 512, maskable, apple)
│   ├── scripts/
│   │   └── generate-icons.ps1     # regenerate PWA icons
│   └── src/
│       ├── animations/           # GSAP helpers + Framer Motion variants
│       ├── components/
│       │   ├── admin/            # dashboard manager components
│       │   ├── effects/          # particles, petals, hearts, ornaments
│       │   ├── sections/         # Hero, Scratch, Story, Events, ...
│       │   └── ui/               # Loader, SectionTitle, FloatingActions, InstallPrompt, ...
│       ├── context/              # AuthContext, DataContext
│       ├── data/                 # default/sample data used offline
│       ├── hooks/                # useCountdown, useLenis
│       ├── lib/                  # axios client
│       ├── pages/                # Invitation, AdminLogin, AdminDashboard
│       └── styles/               # Tailwind + luxury theme CSS
│
└── backend/                      # Node.js + Express API
    ├── config/                   # db + env config
    ├── controllers/              # all route handlers
    ├── middleware/               # JWT auth, Multer upload
    ├── models/                   # (removed - backend uses raw pg/SQL queries)
    ├── routes/                   # API routes
    ├── uploads/                  # uploaded images (gitignored)
    ├── utils/                    # sample data
    ├── server.js                 # entry point
    └── seed.js                   # seeds admin + sample content
```

## API Reference

| Method | Endpoint           | Auth | Description               |
| ------ | ------------------ | ---- | ------------------------- |
| POST   | `/api/login`       | -    | Admin login, returns JWT  |
| GET    | `/api/me`          | yes  | Current admin             |
| GET    | `/api/couple`      | -    | Bride/groom + date        |
| GET    | `/api/couple/:slug`| -    | Couple by invitation slug |
| PUT    | `/api/couple`      | yes  | Update couple             |
| GET    | `/api/story`       | -    | List story chapters       |
| POST   | `/api/story`       | yes  | Add story chapter         |
| PUT    | `/api/story/:id`   | yes  | Update story chapter      |
| DELETE | `/api/story/:id`   | yes  | Delete story chapter      |
| GET    | `/api/events`      | -    | List events               |
| POST   | `/api/events`      | yes  | Add event                 |
| PUT    | `/api/events/:id`  | yes  | Update event              |
| DELETE | `/api/events/:id`  | yes  | Delete event              |
| GET    | `/api/countdown`   | -    | Get countdown settings    |
| PUT    | `/api/countdown`   | yes  | Update countdown settings |
| GET    | `/api/venue`       | -    | Get venue                 |
| PUT    | `/api/venue`       | yes  | Update venue              |
| GET    | `/api/family`      | -    | Get family info           |
| PUT    | `/api/family`      | yes  | Update family info        |
| GET    | `/api/theme`       | -    | Get theme                 |
| PUT    | `/api/theme`       | yes  | Update theme              |
| POST   | `/api/upload`      | yes  | Upload image              |

## Guests install it as an app

The invitation is a Progressive Web App, so guests on their phones can add it to their home screen and open it full-screen like a native app (no app store needed):

- **Android (Chrome)**: after visiting, a banner asks "Add this invitation to your phone" - tap **Install App**.
- **iPhone (Safari)**: tap **Share** -> **Add to Home Screen**. An install banner with instructions also appears.
- Once installed, it opens full-screen with its own icon and works **offline** (the invitation shell + photos are cached by the service worker).

The PWA is fully automatic - no extra build step. Icons are in `frontend/public/icons/`; regenerate them with `frontend/scripts/generate-icons.ps1` (PowerShell) or replace the PNGs with your own.

## Database Collections

`admins`, `couples`, `stories`, `events`, `countdowns`, `venues`, `families`, `themes`

## Customisation Tips

- **Replace photos**: put your real photos in `frontend/public/images/` and keep the same filenames, or upload through the admin panel.
- **Theme colours**: edit `frontend/tailwind.config.js` and `frontend/src/styles/index.css`.
- **Invitation slug**: change the slug in the admin Couple tab. The invitation lives at `/your-slug`.

See `DEPLOYMENT.md` for the full production guide. The app is deploy-ready for **Vercel** (frontend + API serverless in one project) with a MongoDB Atlas database.
