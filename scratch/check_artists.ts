import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const artists = await prisma.artist.findMany();
  console.log("Artists:", JSON.stringify(artists, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
