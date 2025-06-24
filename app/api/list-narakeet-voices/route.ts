import { verifyJwt } from "@/libs/cognito/jwt";
import { listVoices } from "@/libs/narakeet/narakeet";

import { headers } from "next/headers";

export const maxDuration = 60;
// export const runtime = "edge";

export async function POST(req: Request) {
  const headersApi = await headers();

  const { lang } = await req.json();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  if (isVerified) {
    let resp = await listVoices();

    if (lang) {
      resp = resp?.filter((item) => item?.languageCode === lang);
    }

    return Response.json(resp);
  } else {
    return Response.json({
      message: "Not authorized",
    });
    // throw new Error("Unauthorized");
  }
}
