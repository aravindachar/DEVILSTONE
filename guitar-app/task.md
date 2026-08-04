# Academy LMS Setup Checklist

- [x] Ingest Table of Contents from Curriculum PDF
- [x] Create Next.js 15 template application `academy`
- [x] Install dependencies: `@prisma/client`, `@prisma/adapter-better-sqlite3`, `better-sqlite3`, `lucide-react`, `@tailwindcss/typography`
- [x] Configure Prisma 7 SQLite schema (`schema.prisma`) and parameters (`prisma.config.ts`)
- [x] Run migrations and client compile: `npx prisma migrate dev`, `npx prisma generate`
- [x] Seed SQLite database with all 20 sessions and Session 1 lessons (`seed.js`)
- [x] Implement backend API: `GET /api/sessions` and `POST /api/progress`
- [x] Implement React Frontend layouts: `Sidebar.tsx`, `LessonView.tsx`, `page.tsx`
- [x] Verify Next.js production compilation build
- [x] Start Next.js development server on port 3001
- [x] Start Fretboard Console server on port 5173
