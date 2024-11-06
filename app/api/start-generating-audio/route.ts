import { verifyJwt } from "@/libs/cognito/jwt";
import {
  IStartGeneratingAudioParams,
  startGeneratingAudio,
} from "@/libs/narakeet/narakeet";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const headersApi = headers();

  const { text, voice, speed, volume } = await req.json();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  if (isVerified) {
    const resp = await startGeneratingAudio({
      text,
      voice,
      speed,
      volume,
    } as IStartGeneratingAudioParams);

    return Response.json(resp);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
