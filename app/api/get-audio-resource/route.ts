import { verifyJwt } from "@/libs/cognito/jwt";
import {
  getAudioResource,
  IGetAudioResourceParams,
} from "@/libs/narakeet/narakeet";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const headersApi = headers();

  const { statusUrl } = await req.json();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  if (isVerified) {
    console.log("STATUS URL", statusUrl);
    const resp = await getAudioResource({
      statusUrl,
    } as IGetAudioResourceParams);

    return Response.json(resp);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
