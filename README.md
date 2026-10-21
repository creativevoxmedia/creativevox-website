# CreativeVox Media — Agency Website

Production-ready website for **CreativeVox Media** (Bareilly, Uttar Pradesh, India) — dark glassmorphism design, orange→red→pink gradient accents, kinetic hero, tilted marquee ribbon, animated counters and a working contact form backed by MongoDB.

Tagline: **"Stop blending in."** · Descriptor: **Creative · Digital · Technology**

---

## Tech Stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Frontend | React (Create React App + CRACO alias), Tailwind CSS, Framer Motion, Lenis smooth scrolling, sonner toasts |
| Backend  | FastAPI (Python), Motor (async MongoDB)                            |
| Database | MongoDB                                                            |
| Email    | Optional SMTP notification (database-only when not configured)     |

## Project Structure

```
creativevox-media-website/
├── frontend/
│   ├── public/
│   │   ├── index.html          # SEO meta, Open Graph, JSON-LD, fonts
│   │   ├── favicon.svg         # Red "C" brand mark
│   │   ├── hero-artwork.jpg    # AI-generated hero visual (replaceable)
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── data/
│   │   │   ├── content.js      # ★ ALL website text/stats/links — edit here
│   │   │   ├── portfolio.json  # ★ Capability cards + portfolio projects
│   │   │   └── testimonials.js # ★ Placeholder reviews — replace with real ones
│   │   ├── components/         # Navbar, Hero, Ticker, Services, About,
│   │   │                       # StatsBar, Work, Bring, Process, Testimonials,
│   │   │                       # Contact, Footer, Logo, Reveal, ScrollProgress,
│   │   │                       # BackToTop
│   │   ├── pages/              # Home.jsx, NotFound.jsx (404)
│   │   ├── lib/scroll.js       # Lenis smooth-scroll helpers
│   │   ├── App.js              # Router, ErrorBoundary, Lenis, toasts
│   │   └── index.css           # Design system (glass, gradients, buttons)
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── server.py               # FastAPI app + /api/contact endpoint
│   ├── .env.example            # MONGO_URL + optional SMTP variables
│   └── requirements.txt
└── README.md
```

## Quick Start (Local)

**Prerequisites:** Node.js 18+ with Yarn, Python 3.10+, MongoDB running locally (or an Atlas URI).

1. **Backend**

   ```bash
   cd backend
   python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env                              # then edit values if needed
   uvicorn server:app --reload --port 8001
   ```

   The API is now at `http://localhost:8001/api/`.

2. **Frontend**

   ```bash
   cd frontend
   yarn install
   cp .env.example .env      # set REACT_APP_BACKEND_URL=http://localhost:8001
   yarn start
   ```

   The site runs at `http://localhost:3000`.

## Build for Production

```bash
cd frontend
yarn build            # outputs static files to frontend/build/
```

Serve `frontend/build/` from any static host or CDN.

## Deploy

**Frontend — Vercel or Netlify**

- Root directory: `frontend`
- Build command: `yarn build`
- Publish directory: `frontend/build` (Netlify) / build output auto-detected (Vercel)
- Environment variable: `REACT_APP_BACKEND_URL=https://<your-backend-domain>`

**Backend — Render or Railway**

- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- Environment variables: copy everything from `backend/.env.example` and fill in your values.
- Use a MongoDB Atlas connection string as `MONGO_URL`.

After deploying both, update `frontend/.env`'s `REACT_APP_BACKEND_URL` to the backend URL and redeploy the frontend. Also update `frontend/public/sitemap.xml`, `robots.txt` and the canonical/OG URLs in `public/index.html` to your real domain.

## Contact Form — Email Setup

The form **always saves submissions to MongoDB** (collection `contact_submissions`). Email notifications are **optional**:

1. Open `backend/.env`
2. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` (and optionally `SMTP_FROM_EMAIL`, `CONTACT_TO_EMAIL`).
3. Restart the backend. If SMTP fails or is unset, submissions still save — nothing is lost.

To read submissions: connect to your MongoDB and browse the `contact_submissions` collection (any Mongo GUI works).

## Editing Content (no code needed)

- **All text, stats, buttons, links, budgets:** `frontend/src/data/content.js`
- **Portfolio projects:** open `frontend/src/data/portfolio.json` and add entries to `"projects"`:

  ```json
  {
    "category": "WEB EXPERIENCE",
    "title": "Project name",
    "description": "One or two lines about the project.",
    "tag": "WEB DESIGN + DEVELOPMENT",
    "image": "/project-image.jpg"   // optional — omit for a gradient tile
  }
  ```

- **Testimonials:** `frontend/src/data/testimonials.js`. The current reviews are **PLACEHOLDERS** — replace them with real client quotes and set `"placeholder": false` (or remove the key) so the amber badge disappears.
- **Hero artwork:** replace `frontend/public/hero-artwork.jpg` (square image works best) and update `hero.visual.imageAlt` in `content.js` if needed.
- **Favicon:** `frontend/public/favicon.svg`.
- **Social links:** add your profile URLs to `footer.socials` in `content.js`.

## Accessibility & Performance

- Semantic landmarks, labelled form fields, keyboard-focus rings, AA-contrast text.
- Honours `prefers-reduced-motion` (Lenis and animations disabled for those users).
- Lazy-loaded below-the-fold images, single hero image eager-loaded with high fetch priority.

## API Reference

| Method | Path            | Description                                        |
| ------ | --------------- | -------------------------------------------------- |
| GET    | `/api/`         | Health check                                       |
| POST   | `/api/contact`  | Save contact enquiry (+ optional SMTP email). Body: `{ name, email, phone?, service?, budget?, message, website? }` — `website` is a honeypot. |

---

© 2026 CreativeVox Media. All rights reserved.
