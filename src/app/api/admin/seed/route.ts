import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Clear existing data (optional, but good for a fresh start)
    // await prisma.comic.deleteMany();

    // 2. Create Premium Romantic Comics
    const comics = [
      {
        title: "Moonlight Desires",
        synopsis: "In a world where secrets are kept under the moonlight, a forbidden love blooms between a mysterious prince and a commoner.",
        coverImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2071&auto=format&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2113&auto=format&fit=crop",
        genres: ["Romance", "Fantasy", "Drama"],
        status: "Ongoing",
        ageRating: "18+",
        isFeatured: true,
        isExclusive: true,
        totalViews: 12500,
        totalLikes: 8400,
        authorId: "AI-Author-1"
      },
      {
        title: "Office Midnight Tension",
        synopsis: "Working overtime has its perks, especially when your boss is as mysterious as the night itself. A story of power, desire, and office secrets.",
        coverImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        genres: ["Romance", "Drama", "Office"],
        status: "Ongoing",
        ageRating: "18+",
        isFeatured: false,
        isExclusive: true,
        totalViews: 8900,
        totalLikes: 5200,
        authorId: "AI-Author-2"
      }
    ];

    for (const comicData of comics) {
      const comic = await prisma.comic.create({
        data: {
          ...comicData,
          episodes: {
            create: [
              {
                episodeNumber: 1,
                title: "The First Encounter",
                isFree: true,
                coinCost: 0,
                likes: 1200,
                views: 5000,
                pagesUrls: [
                   "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1908&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1887&auto=format&fit=crop"
                ]
              },
              {
                episodeNumber: 2,
                title: "Darker Intentions",
                isFree: false,
                coinCost: 10,
                likes: 800,
                views: 3000,
                pagesUrls: [
                   "https://images.unsplash.com/photo-1601850494422-3cf14624b0bb?q=80&w=2070&auto=format&fit=crop"
                ]
              }
            ]
          }
        }
      });
    }

    return NextResponse.json({ message: "Database seeded successfully with Premium Romantic content!" });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
