# DEVILSTONE Unified Platform Walkthrough

We restructured the codebase to unify the **DEVILSTONE Interactive Fretboard Console** and the **DEVILSTONE Academy Syllabus** into a single, high-performance Next.js 15 application running on port **3001**.

---

## 1. Unified Routing Layout

- **Main Console Page (`/`):** The landing page is now the full interactive fretboard console. It features the 24-fret obsidian neck, controls, metronome sequencer, shape libraries, and grimoire panel styled in the Minimal Luxury light theme.
- **Syllabus Academy Page (`/academy`):** The 20-session LMS curriculum page containing the syllabus pane (left accordion) and lesson grimoire details (right pane) with progress checkboxes.
- **Navbar Integration:** The console navbar links lead directly to their respective sections, with "Academy" navigating to `/academy` and "Console" returning to `/`.
- **Project Branding:** Unified all system text headers to the **DEVILSTONE** and **DEVILSTONE Academy** brands.

---

## 2. Shared Architecture & Dependencies

- **Components Ported:** Copy-pasted the custom controls, metronome, fretboards, shapes, context hooks, and audio hooks from `guitar-app/src` into `academy/src`.
- **Next.js Client Directives:** Configured `'use client'` on all interactive elements (fretboard, controls, metronome, grimoire, shapes) to ensure compatibilities with Next.js App Router.
- **Combined Stylesheet:** Combined Tailwind CSS imports, typography plugins, and the shifting mesh gradient backgrounds inside `academy/src/app/globals.css`.

---

## 3. Local Server Info

- **Next.js Unified Platform:** Running on **[http://localhost:3001/](http://localhost:3001/)**
  - Path `/` (Interactive Console)
  - Path `/academy` (Lessons Curriculum)
- **Vite Standalone Console (Backup):** Running on **[http://localhost:5173/](http://localhost:5173/)**
