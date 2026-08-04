const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');
const path = require('path');

try {
  console.log("1. Starting test...");
  const dbPath = path.resolve(__dirname, 'prisma', 'dev.db');
  console.log("2. DB path resolved to:", dbPath);
  const db = new Database(dbPath);
  console.log("3. better-sqlite3 database opened successfully.");
  const adapter = new PrismaBetterSqlite3(db);
  console.log("4. PrismaBetterSqlite3 adapter instantiated.");
  const prisma = new PrismaClient({ adapter });
  console.log("5. PrismaClient instantiated with adapter.");

  prisma.user.findMany().then((users) => {
    console.log("6. Query successful! Found users:", users);
    process.exit(0);
  }).catch((err) => {
    console.error("Query failed:", err);
    process.exit(1);
  });
} catch (e) {
  console.error("Instantiation exception caught:", e);
  process.exit(1);
}
