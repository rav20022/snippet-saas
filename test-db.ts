// test-db.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("1. Connecting to DB...");
  // Try to create a dummy user
  const user = await prisma.user.create({
    data: {
      email: `test-${Date.now()}@example.com`,
      name: "Test User",
    },
  });
  console.log("2. SUCCESS! Created user:", user.id);

  const count = await prisma.user.count();
  console.log("3. Total users in DB:", count);
}

main()
  .catch((e) => {
    console.error("FAILURE:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });