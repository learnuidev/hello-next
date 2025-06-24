import { verifyJwt } from "@/libs/cognito/jwt";
import { elevenlabs } from "@/libs/elevenlabs/client";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const headersApi = await headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified) {
    const sub = await elevenlabs.user.getSubscription();
    return Response.json(sub);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
