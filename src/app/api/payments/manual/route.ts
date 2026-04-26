import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, coins, method, proofUrl } = await request.json();

    if (!amount || !coins || !method || !proofUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const paymentRequest = await prisma.paymentRequest.create({
      data: {
        userId: (session.user as any).id,
        amount: parseFloat(amount),
        coins: parseInt(coins),
        method,
        proofUrl,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, paymentRequest });
  } catch (error: any) {
    console.error("Payment Request Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Only admins or the user themselves can see their requests
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const requests = await prisma.paymentRequest.findMany({
      where: {
        userId: (session.user as any).id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(requests);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
