import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const coinsAmount = parseInt(session.metadata?.coinsAmount || "0");
    const planId = session.metadata?.planId;
    const type = session.metadata?.type;

    if (!userId) return NextResponse.json({ error: "No user found in metadata" }, { status: 400 });

    if (type === "coins" && coinsAmount > 0) {
      // Add coins to user balance
      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: { coinsBalance: { increment: coinsAmount } },
        }),
        prisma.coinTransaction.create({
          data: {
            userId,
            coinsAmount,
            pricePaid: session.amount_total ? session.amount_total / 100 : 0,
            type: "Purchase",
          },
        }),
      ]);
    } else if (type === "subscription") {
      // Update user subscription
      await prisma.user.update({
        where: { id: userId },
        data: { subscriptionPlan: planId },
      });
    }
  }

  return NextResponse.json({ received: true });
}
