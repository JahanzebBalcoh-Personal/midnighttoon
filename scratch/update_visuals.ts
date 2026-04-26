import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const comic = await prisma.comic.findFirst({
    where: { title: { contains: "Forbidden Professor", mode: "insensitive" } }
  });

  if (comic) {
    await prisma.comic.update({
      where: { id: comic.id },
      data: {
        coverImage: "/images/comics/forbidden_professor_cover.png",
        bannerImage: "/images/comics/forbidden_professor_banner.png",
        synopsis: "When a brilliant young professor meets a student who challenges everything he knows about discipline, a dangerous game of forbidden desire begins. How far will they go before the secrets consume them?"
      }
    });
    console.log("Updated Forbidden Professor with new sexy manhwa visuals!");
  } else {
    console.log("Comic not found. Check the title.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
