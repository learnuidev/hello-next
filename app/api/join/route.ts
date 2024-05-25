import { verifyJwt } from "@/libs/cognito/jwt";
import { join as joinApi } from "@/libs/dynamodb/join";
import { scan } from "@/libs/dynamodb/scan";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { select, join } = await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified) {
    const resp = await joinApi({ select, join });
    return Response.json(resp);
  } else {
    return Response.json({
      message: "Not authorized",
    });
    // throw new Error("Unauthorized");
  }
}
