# DEVILSTONE Unified Platform - Academy & Console

⚠️ **Status: Work In Progress (WIP)**  
*This Next.js application unites the interactive guitar console and the syllabus academy into a single high-performance project.*

---

## ✦ Platform Structure & Routes

This app runs on port **3001** and contains two primary pathways:
1. **Interactive Fretboard Console (`/`):** The main landing page. Houses the 24-fret guitar console, metronome sequencer, scale selects, chord overlays, shapes library, and grimoire panel in a Minimal Luxury theme.
2. **Syllabus Academy (`/academy`):** The educational section. Hosts the 20 curriculum sessions (syllabus left pane) and lesson view summaries (grimoire right pane) with progress checkbox toggles.

---

## ✦ Technology Details
- **Frontend:** Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, `@tailwindcss/typography`.
- **Database ORM:** Prisma 7.9+ configured with SQLite.
- **Database Driver Adapter:** SQLite runs via the `@prisma/adapter-better-sqlite3` driver bridge, reducing client binary overhead.

---

## ✦ Local Development & Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Database Sync
Generate schema tables and database seeds:
```bash
npx prisma migrate dev --name init
npx prisma generate
node prisma/seed.js
```

### 3. Start development server
Runs the project on `http://localhost:3001/`:
```bash
npx next dev -p 3001
```

### 4. Build optimized bundle
```bash
npm run build
```
