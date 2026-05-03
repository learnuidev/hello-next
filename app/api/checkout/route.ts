import { polarApi } from "@/libs/polar/polar-api";
import { polarApiConfig } from "@/libs/polar/polar-api-config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { productId, customerEmail, customerName, contentId, successUrl } =
    await request.json();

  try {
    const checkout = await polarApi.checkouts.create({
      products: [productId],
      customerEmail: customerEmail,
      customerName: customerName,
      successUrl: successUrl || polarApiConfig.successUrl,

      metadata: {
        contentId,
      },
    });

    // Store checkout.id in your database for reference
    // await saveCheckoutId(checkout.id, userId);

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
