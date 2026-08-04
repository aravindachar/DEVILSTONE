# DEVILSTONE Repository Unification Walkthrough

We merged both project modules (`guitar-app` and `academy`) into a single unified directory at the repository root level (**`DevilsTone`**). This simplifies the layout, removes subfolders, and enables **zero-configuration deployments on Vercel**.

---

## 1. Merged Folder Structure
All files have been elevated to the repository root directory `DevilsTone/`:
- **`src/`:** Shares all custom components, controls, metronome hooks, fretboards, shapes, views, and routing logic.
- **`src/app/page.tsx`:** Renders the main **DEVILSTONE interactive fretboard console** on the home route (`/`).
- **`src/app/academy/page.tsx`:** Renders the **DEVILSTONE Academy syllabus** curriculum on the `/academy` route.
- **`prisma/`:** Holds database schemas (`schema.prisma`), migrations, and curriculum seeder scripts (`seed.js`).
- **`package.json` / `tsconfig.json` / `next.config.ts`:** Consolidated Next.js configurations at the root level.
- **`dev.db`:** Synced local SQLite database located directly in the root folder.

---

## 2. Dynamic Performance & Colors
- **GPU-Accelerated Mesh Backgrounds:** Blobs are rendered as absolute divs animated with hardware-accelerated CSS `translate3d`, which offloads morphing workloads to the GPU compositor thread and removes scroll stuttering.
- **Tuned Blur Thresholds:** Reduced glass panel backdrop-filter blur from `24px` to `12px` to drastically improve scrolling and hover reactivity.
- **Colorized Academy Boxes:** Configured cyclic frosted glass color accents (Cyan, Rose, Amber, Blue) on the 20 Session accordion panels. Progress bars glow with their respective session colors (and green on 100% completion). 

---

## 3. Local Server Info
- **Unified DEVILSTONE Platform:** Running at **[http://localhost:3001/](http://localhost:3001/)**
  - **`/`**: Fretboard Console
  - **`/academy`**: Academy Syllabus

---

## 4. Vercel Zero-Config Deployment
Since the Next.js project files are now situated directly at the root of the repository:
1. Log into Vercel and import this repository.
2. Vercel will **automatically detect** the Next.js framework in the root folder.
3. You can click **Deploy** immediately with **zero custom directory configuration settings required**!
