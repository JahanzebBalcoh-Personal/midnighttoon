import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/coins/unlock - Unlock an episode with coins
export async function POST(request: Request) {
    try {
        const { userId, episodeId } = await request.json();

        // Get user and episode
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const episode = await prisma.episode.findUnique({ where: { id: episodeId } });

        if (!user || !episode) {
            return NextResponse.json({ error: "User or episode not found" }, { status: 404 });
        }

        if (episode.isFree) {
            return NextResponse.json({ error: "Episode is already free" }, { status: 400 });
        }

        // Check already unlocked
        const existing = await prisma.unlockedEpisode.findFirst({
            where: { userId, episodeId },
        });
        if (existing) {
            return NextResponse.json({ message: "Already unlocked" });
        }

        // Check coins
        if (user.coinsBalance < episode.coinCost) {
            return NextResponse.json({ error: "Not enough coins", required: episode.coinCost, balance: user.coinsBalance }, { status: 402 });
        }

        // Deduct coins and unlock
        await prisma.$transaction([
            prisma.user.update({
                where: { id: userId },
                data: { coinsBalance: { decrement: episode.coinCost } },
            }),
            prisma.unlockedEpisode.create({
                data: { userId, episodeId, coinsSpent: episode.coinCost },
            }),
            prisma.coinTransaction.create({
                data: {
                    userId,
                    coinsAmount: -episode.coinCost,
                    pricePaid: 0,
                    type: "Unlock",
                },
            }),
        ]);

        return NextResponse.json({ message: "Episode unlocked!", newBalance: user.coinsBalance - episode.coinCost });
    } catch (error) {
        console.error("Error unlocking episode:", error);
        return NextResponse.json({ error: "Failed to unlock episode" }, { status: 500 });
    }
}
