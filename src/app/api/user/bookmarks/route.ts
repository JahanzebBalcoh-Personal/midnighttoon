import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { comicId } = await request.json();
        if (!comicId) {
            return NextResponse.json({ error: "Missing comicId" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                userId: user.id,
                comicId: comicId
            }
        });

        if (existingBookmark) {
            await prisma.bookmark.delete({
                where: { id: existingBookmark.id }
            });
            return NextResponse.json({ bookmarked: false });
        } else {
            await prisma.bookmark.create({
                data: {
                    userId: user.id,
                    comicId: comicId
                }
            });
            return NextResponse.json({ bookmarked: true });
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
