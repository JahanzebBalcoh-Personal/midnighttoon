import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/comics - Get all comics
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const genre = searchParams.get("genre");
        const status = searchParams.get("status");
        const featured = searchParams.get("featured");
        const exclusive = searchParams.get("exclusive");

        const where: Record<string, unknown> = {};
        if (genre) where.genres = { has: genre };
        if (status) where.status = status;
        if (featured === "true") where.isFeatured = true;
        if (exclusive === "true") where.isExclusive = true;

        const comics = await prisma.comic.findMany({
            where,
            orderBy: { totalViews: "desc" },
            include: {
                _count: { select: { episodes: true } },
            },
        });

        return NextResponse.json(comics);
    } catch (error) {
        console.error("Error fetching comics:", error);
        return NextResponse.json({ error: "Failed to fetch comics" }, { status: 500 });
    }
}

// POST /api/comics - Create a new comic (Admin)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const comic = await prisma.comic.create({ data: body });
        return NextResponse.json(comic, { status: 201 });
    } catch (error) {
        console.error("Error creating comic:", error);
        return NextResponse.json({ error: "Failed to create comic" }, { status: 500 });
    }
}
