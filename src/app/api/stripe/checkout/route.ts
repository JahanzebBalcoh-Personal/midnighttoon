import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId, coinsAmount, type } = await request.json();

    let line_items: any[] = [];

    if (type === "coins") {
      line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${coinsAmount} Midnight Coins`,
              description: "Use these coins to unlock premium episodes.",
            },
            unit_amount: Math.round((coinsAmount / 10) * 100), // Example: 100 coins = $10
          },
          quantity: 1,
        },
      ];
    } else {
      // Handle subscriptions (simplified for now)
      line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planId} Subscription`,
              description: "Monthly unlimited access to all comics.",
            },
            unit_amount: planId === "Premium" ? 999 : 499, // $9.99 or $4.99
          },
          quantity: 1,
        },
      ];
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: type === "subscription" ? "subscription" : "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/subscribe`,
      metadata: {
        userId: session!.user!.id,
        coinsAmount: coinsAmount?.toString() || "0",
        planId: planId || "",
        type,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
