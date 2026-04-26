import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"; // Assuming authOptions is in src/lib/auth.ts

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                bookmarks: {
                    include: {
                        comic: {
                            select: {
                                id: true,
                                title: true,
                                coverImage: true,
                                status: true
                            }
                        }
                    },
                    orderBy: { createdAt: "desc" }
                },
                readingHistory: {
                    include: {
                        comic: {
                            select: {
                                id: true,
                                title: true,
                                coverImage: true
                            }
                        },
                        episode: {
                            select: {
                                id: true,
                                episodeNumber: true,
                                title: true
                            }
                        }
                    },
                    orderBy: { lastReadAt: "desc" },
                    take: 10
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            bookmarks: user.bookmarks,
            history: user.readingHistory,
            stats: {
                coins: user.coinsBalance,
                plan: user.subscriptionPlan
            }
        });
    } catch (error) {
        console.error("Error fetching library:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
