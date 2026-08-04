# Vercel Database Seeding Checklist

- [x] Configure `"build": "prisma migrate deploy && node prisma/seed.js && next build"` in `package.json` to migrate and seed during the Vercel build container step
- [x] Update `prisma.config.ts` to fallback to `"file:./dev.db"` if `DATABASE_URL` is not set in Vercel environment variables
- [x] Verify production compilation and database seeding runs successfully
- [x] Verify local server is active on port 3001
- [x] Update walkthrough report
