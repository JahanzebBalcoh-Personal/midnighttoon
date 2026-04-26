import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { variantId, coinsAmount, planId, type } = await request.json();

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                userId: (session.user as any).id,
                coinsAmount: coinsAmount?.toString() || "0",
                planId: planId || "",
                type: type
              }
            }
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMONSQUEEZY_STORE_ID
              }
            },
            variant: {
              data: {
                type: "variants",
                id: variantId.toString()
              }
            }
          }
        }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      return NextResponse.json({ error: data.errors[0].detail }, { status: 400 });
    }

    return NextResponse.json({ url: data.data.attributes.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
