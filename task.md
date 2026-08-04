# Vercel Build & TS Optimization Checklist

- [x] Configure `"postinstall": "prisma generate"` script in `package.json` to auto-build Prisma types on Vercel
- [x] Declare `prisma` namespace property on global window in `src/lib/db.ts`
- [x] Declare type definition `SessionWithSubtopics` in `src/app/api/sessions/route.ts`
- [x] Annotate callback parameters (`session`, `sub`, `s`) inside sessions API formatting maps
- [x] Verify local build builds successfully with exit code 0
- [x] Restart the unified Next.js dev server on port 3001
- [x] Write summary in [walkthrough.md](file:///c:/Users/arvin/OneDrive/Documents/Image-Line/FL%20Studio/Settings/Hardware/Novation/user/Desktop/DevilsTone/walkthrough.md)
