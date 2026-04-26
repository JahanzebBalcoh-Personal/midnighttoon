import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Add logic to check if user is admin
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const requests = await prisma.paymentRequest.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true
          }
        }
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

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { requestId, status } = await request.json();

    if (!requestId || !status) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const paymentRequest = await prisma.paymentRequest.findUnique({
      where: { id: requestId },
      include: { user: true }
    });

    if (!paymentRequest) return NextResponse.json({ error: "Request not found" }, { status: 404 });

    if (status === "APPROVED") {
      // Use a transaction to update status and add coins
      await prisma.$transaction([
        prisma.paymentRequest.update({
          where: { id: requestId },
          data: { status: "APPROVED" }
        }),
        prisma.user.update({
          where: { id: paymentRequest.userId },
          data: {
            coinsBalance: {
              increment: paymentRequest.coins
            }
          }
        }),
        prisma.coinTransaction.create({
          data: {
            userId: paymentRequest.userId,
            coinsAmount: paymentRequest.coins,
            pricePaid: paymentRequest.amount,
            type: "Manual Top-up",
          }
        })
      ]);
    } else {
      await prisma.paymentRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED" }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin Payment Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
