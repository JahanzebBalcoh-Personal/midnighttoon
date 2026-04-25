import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/episodes/[id] - Get episode details
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const episode = await prisma.episode.findUnique({
            where: { id: params.id },
            include: {
                comic: { select: { title: true, coverImage: true } },
                comments: {
                    include: { user: { select: { username: true, avatar: true } } },
                    orderBy: { createdAt: "desc" },
                    take: 20,
                },
            },
        });

        if (!episode) {
            return NextResponse.json({ error: "Episode not found" }, { status: 404 });
        }

        return NextResponse.json(episode);
    } catch (error) {
        console.error("Error fetching episode:", error);
        return NextResponse.json({ error: "Failed to fetch episode" }, { status: 500 });
    }
}
