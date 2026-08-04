# DEVILSTONE v2.0 - Fretboard & Theory practice Console

⚠️ **Status: Work In Progress (WIP)**  
*This project is currently under active development. There is still a lot of work to be done, new features to be added, and refinements to be made to the audio engine and shape library.*

---

## ✦ Overview
DEVILSTONE is a highly interactive, responsive music theory dashboard and guitar fretboard custom-built for guitarists, songwriters, and theory practitioners. Designed with a **Minimal Luxury** startup aesthetic, the interface features frosted glass cards (`backdrop-filter: blur(24px)`) floating over a slowly morphing radial mesh gradient.

It decouples core music theory math (keys, scales, tuning offsets, and position hand boxes) from the presentation layer, allowing you to practices scales on the master view or study isolated boxes in the shape library.

---

## ✦ Key Features

### 1. Tier 1: Master practice Console
- **24-Fret Fretboard:** Play note plucks across standard or alternative tunings on a high-contrast obsidian slate neck.
- **Precision Metronome Scheduler:** A drift-free metronome hook using `AudioContext.currentTime` lookahead scheduling. Supports subdivision (quarter vs. 8th notes), metronome accents, and a dynamic eighth-note **Swing Feel** controller.
- **Multiple Tunings:** Standard (E), Drop D, DADGAD, Open G, Half Step Down, and Full Step Down.
- **Interval Displays:** Instantly toggle between absolute note spellings (e.g. C, F#) or relative scale degrees (e.g. R, 3rd, b5).
- **Strum Mode:** Sequential arpeggiator Plucking from the low string down to the high string.

### 2. Tier 2: Shape & Pattern Library
- **Pentatonic Box Shapes:** Automatically resolves and renders the **5 standard pentatonic box positions** in the selected key.
- **CAGED Chord Overlays:** Renders the 5 core chord shapes (C, A, G, E, D) mapping Major/Minor triads within their box spans.
- Each mini-fretboard is clickable and triggers corresponding audio pluck notes.

### 3. Tier 3: Theory Grimoire
- Displays exact note spelling configurations for the active scale.
- Spells out the interval formula spelling (e.g. `1 - b3 - 4 - 5 - b7`).
- Includes a historical and musical description of the scale, styling context, and recommended practice patterns.

---

## ✦ Technology Stack
- **Framework:** React 18+ (Vite)
- **Language:** TypeScript (Strict mode / verbatimModuleSyntax compliant)
- **Styling:** Custom CSS + Glassmorphism UI tokens
- **Audio:** Web Audio API synth oscillators & filter envelopes

---

## ✦ Local Development & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run local Dev Server
Starts the Vite dev server locally.
```bash
npm run dev
```
Open the local URL (usually `http://localhost:5173/` or subsequent port) in your browser.

### 3. Production Build
Compiles and bundles the application for production deployment.
```bash
npm run build
```

### 4. Lint and Audit Code
Audits code structure and variables using Oxlint.
```bash
npm run lint
```
