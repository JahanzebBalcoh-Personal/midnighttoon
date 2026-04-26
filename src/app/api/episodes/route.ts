import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/episodes - Create a new episode (Admin)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { comicId, episodeNumber, title, pagesUrls, coinCost, isFree, thumbnail } = body;

        if (!comicId || !episodeNumber || !title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const episode = await prisma.episode.create({
            data: {
                comicId,
                episodeNumber: parseInt(episodeNumber),
                title,
                pagesUrls: Array.isArray(pagesUrls) ? pagesUrls : pagesUrls.split("\n").map((url: string) => url.trim()).filter((url: string) => url !== ""),
                coinCost: parseInt(coinCost) || 0,
                isFree: Boolean(isFree),
                thumbnail: thumbnail || null
            }
        });

        return NextResponse.json(episode, { status: 201 });
    } catch (error) {
        console.error("Error creating episode:", error);
        return NextResponse.json({ error: "Failed to create episode" }, { status: 500 });
    }
}
