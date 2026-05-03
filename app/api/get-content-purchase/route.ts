import { verifyJwt } from "@/libs/cognito/jwt";
import { headers } from "next/headers";

import { getContentPurchase } from "./get-content-purchase.api";

export const maxDuration = 60;

export async function POST(req: Request) {
  const headersApi = await headers();
  const { contentId } = await req.json();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  if (isVerified) {
    const contentPurchase = await getContentPurchase(
      isVerified.email,
      contentId,
    );

    return Response.json(contentPurchase);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
