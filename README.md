# DEVILSTONE

> Master your fretboard through dynamic shape overlays, precision scheduled metronomes, and clean interactive audio theory.

DEVILSTONE is an advanced interactive guitar visualization console and educational academy. Inspired by the clean, restrained, pro-app aesthetics of Apple, Linear, and Raycast, the platform features a sleek dark mode system designed to translate abstract music theory into physical fingerboard patterns.

---

## ✦ Key Features

### 1. Interactive 24-Fret Fretboard
*   **Maple Cream Neck:** Features a highly refined maple neck backing (`#FAF9F6`) with dark clay dot inlays (`#475569`) and nickel fret wires (`#94A3B8`).
*   **Sleek Glass Note Markers:** Notes are styled as translucent dark glass badges (`rgba(18, 24, 39, 0.92)`) with glowing desaturated rims:
    *   **Scale Degrees:** Electric Cyan outline (`#00D7FF`) with clean off-white labels.
    *   **Root Notes:** Coral Red outline (`#EF4444`) with clean off-white labels.
*   **CAGED Shape Overlays:** Instantly highlight C, A, G, E, and D shape chord patterns.

### 2. Precision Audio Metronome & Practice Timer
*   **Fine-Tune BPM:** Double increment control (a short range slider plus detailed `+` / `-` buttons) to adjust BPM by single beats.
*   **Practice Timer:** Selector for 30s, 1m, 2m, 5m, or 10m training blocks. Includes a live ticking countdown and automatic stopping accompanied by a synth beep.
*   **Rhythmic Controls:** Swing feel slider, Subdivision selector (quarter vs 8th notes), and visual flash beat pulse dots.

### 3. Diagram Image Exporter
*   **Scrollbar-Free Captures:** Direct DOM-to-PNG image generation (`html-to-image`) that targets the inner fretboard grid with scrollbar suppression, allowing you to instantly download clean fretboard diagrams.

### 4. Extensive Music Theory Engine
*   **Expanded Scales/Chords:** Includes all 20+ custom formulas (Bebop scales, Harmonic Minor modes, whole-tone systems, diminished arpeggios, and 6th/7th/9th chord extensions).
*   **Descriptive Grimoire:** Context-aware descriptions for every scale/chord selected.

### 5. Curriculum Academy LMS (`/academy`)
*   **Syllabus progress tracking:** A structured progress dashboard spanning all 20 lessons of the Gibson guitar curriculum, saving progress checkpoints to a local database.

---

## ✦ Technology Stack

*   **Frontend:** Next.js (App Router, Turbopack), React 19, TypeScript.
*   **Styling:** Apple/Linear design system rules, custom globals variables, Tailwind CSS v4.
*   **Database & ORM:** Prisma Client v7.9.1.
*   **Driver Bridge:** SQLite datastore running via `@prisma/adapter-better-sqlite3` driver adapter for low-overhead database transactions on serverless functions.
*   **Core Libraries:** `html-to-image` for canvas exports.

---

## ✦ Setup & Operations

### 1. Install dependencies
```bash
npm install
```

### 2. Database Sync
Create database tables, generate Prisma Client types, and seed curriculum lessons:
```bash
npx prisma migrate deploy
npx prisma generate
node prisma/seed.js
```

### 3. Start development server
Runs the console and academy locally at `http://localhost:3001`:
```bash
npx next dev -p 3001
```

### 4. Build for Production
Creates an optimized production bundle (automatically migrates and seeds on build):
```bash
npm run build
```
