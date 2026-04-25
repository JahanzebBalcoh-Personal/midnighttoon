import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/comics/[id] - Get single comic with episodes
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const comic = await prisma.comic.findUnique({
            where: { id: id },
            include: {
                episodes: { orderBy: { episodeNumber: "asc" } },
                _count: { select: { bookmarks: true } },
            },
        });

        if (!comic) {
            return NextResponse.json({ error: "Comic not found" }, { status: 404 });
        }

        // Increment view count
        await prisma.comic.update({
            where: { id: params.id },
            data: { totalViews: { increment: 1 } },
        });

        return NextResponse.json(comic);
    } catch (error) {
        console.error("Error fetching comic:", error);
        return NextResponse.json({ error: "Failed to fetch comic" }, { status: 500 });
    }
}
