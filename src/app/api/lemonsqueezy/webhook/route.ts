import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const hmac = crypto.createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "");
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(request.headers.get("x-signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data;

    if (eventName === "order_created") {
      const { userId, coinsAmount, planId, type } = customData;

      if (type === "coins" && coinsAmount) {
        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { coinsBalance: { increment: parseInt(coinsAmount) } },
          }),
          prisma.coinTransaction.create({
            data: {
              userId,
              coinsAmount: parseInt(coinsAmount),
              pricePaid: parseFloat(payload.data.attributes.total_formatted.replace(/[^0-9.]/g, '')),
              type: "Purchase",
            },
          }),
        ]);
      } else if (type === "subscription") {
        await prisma.user.update({
          where: { id: userId },
          data: { subscriptionPlan: planId },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("LemonSqueezy Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
