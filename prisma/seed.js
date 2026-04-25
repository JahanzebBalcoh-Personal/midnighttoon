const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🌙 Seeding MidnightToon database...\n");

    // Create Artist
    const artist = await prisma.artist.create({
        data: {
            name: "Luna Eclipse",
            email: "luna@midnighttoon.com",
            paymentModel: "RevenueShare",
            revenueSharePercent: 40,
        },
    });
    console.log("✅ Artist created:", artist.name);

    // Create Comics
    const comic1 = await prisma.comic.create({
        data: {
            title: "Midnight Contract",
            authorId: artist.id,
            coverImage: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bannerImage: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "Zara, a struggling graphic designer, signs a one-year contract with the cold and mysterious CEO of a top fashion company. The contract has one secret clause she never expected. As midnight meetings turn into something deeper, the lines between business and desire begin to blur. What happens when the contract expires?",
            genres: ["Romance", "Drama", "Office Romance"],
            tags: ["CEO", "contract", "office", "romance", "drama"],
            status: "Ongoing",
            isFeatured: true,
            isExclusive: false,
            totalViews: 1200000,
            totalLikes: 450000,
        },
    });

    const comic2 = await prisma.comic.create({
        data: {
            title: "Vampire's Kiss",
            authorId: artist.id,
            coverImage: "https://images.unsplash.com/photo-1517409261073-49033331b268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bannerImage: "https://images.unsplash.com/photo-1517409261073-49033331b268?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "A dangerous obsession begins when Elena accidentally awakens an ancient vampire lord who mistakes her for his lost love from centuries ago.",
            genres: ["Fantasy Romance", "Supernatural Romance", "Thriller"],
            tags: ["vampire", "supernatural", "dark romance"],
            status: "Ongoing",
            isFeatured: false,
            isExclusive: true,
            totalViews: 850000,
            totalLikes: 210000,
        },
    });

    const comic3 = await prisma.comic.create({
        data: {
            title: "Forbidden Professor",
            authorId: artist.id,
            coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bannerImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "She was just supposed to be his teaching assistant. But late night grading sessions turn into a dangerous game of forbidden desire.",
            genres: ["Romance", "School Life", "Forbidden Love"],
            tags: ["professor", "forbidden", "university"],
            status: "Completed",
            isFeatured: true,
            isExclusive: false,
            totalViews: 2100000,
            totalLikes: 890000,
        },
    });

    const comic4 = await prisma.comic.create({
        data: {
            title: "Royal Betrayal",
            authorId: artist.id,
            coverImage: "https://images.unsplash.com/photo-1533157961145-8cb585c7f8f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bannerImage: "https://images.unsplash.com/photo-1533157961145-8cb585c7f8f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "Married off to a cruel prince, the new princess finds solace in the arms of his personal bodyguard.",
            genres: ["Drama", "Forbidden Love", "Romance"],
            tags: ["royalty", "betrayal", "bodyguard"],
            status: "Ongoing",
            isFeatured: false,
            isExclusive: false,
            totalViews: 500000,
            totalLikes: 120000,
        },
    });

    const comic5 = await prisma.comic.create({
        data: {
            title: "Neon Nights",
            authorId: artist.id,
            coverImage: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bannerImage: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            synopsis: "In a cyberpunk city, an underworld hacker falls for the detective trying to hunt her down.",
            genres: ["Thriller", "Romance", "Drama"],
            tags: ["cyberpunk", "hacker", "detective"],
            status: "Ongoing",
            isFeatured: false,
            isExclusive: true,
            totalViews: 340000,
            totalLikes: 90000,
        },
    });

    console.log("✅ 5 Comics created");

    // Create Episodes for Midnight Contract
    const episodes = [
        { episodeNumber: 1, title: "Prologue - The Offer", isFree: true, coinCost: 0, views: 100000, likes: 10000 },
        { episodeNumber: 2, title: "The First Meeting", isFree: true, coinCost: 0, views: 95000, likes: 9000 },
        { episodeNumber: 3, title: "The Contract", isFree: true, coinCost: 0, views: 90000, likes: 8500 },
        { episodeNumber: 4, title: "Midnight Rules", isFree: false, coinCost: 15, views: 45000, likes: 5000 },
        { episodeNumber: 5, title: "The Secret Floor", isFree: false, coinCost: 15, views: 40000, likes: 4800 },
    ];

    for (const ep of episodes) {
        await prisma.episode.create({
            data: {
                comicId: comic1.id,
                ...ep,
                pagesUrls: [
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                ],
            },
        });
    }
    console.log("✅ 5 Episodes created for Midnight Contract");

    // Create a demo user
    await prisma.user.create({
        data: {
            username: "midnight_reader",
            email: "reader@midnighttoon.com",
            passwordHash: "demo_hash_replace_with_bcrypt",
            dateOfBirth: new Date("2000-01-15"),
            subscriptionPlan: "Free",
            coinsBalance: 150,
        },
    });
    console.log("✅ Demo user created");

    console.log("\n🌙 Seeding complete! MidnightToon is ready.");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
