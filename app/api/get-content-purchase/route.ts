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

    if (!contentPurchase) {
      // return 404 with message: purchase not found
      return Response.json(
        {
          message: "You have not purchased the content",
        },

        { status: 404 },
      );
    }

    return Response.json(contentPurchase);
  } else {
    return Response.json(
      {
        message: "Not authorized",
      },
      { status: 401 },
    );
  }
}
