import { verifyJwt } from "@/libs/cognito/jwt";
import { elevenlabs } from "@/libs/elevenlabs/client";

import { headers } from "next/headers";

export const maxDuration = 60;

export async function POST(req: Request) {
  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified) {
    const history = await elevenlabs.history.getAll();

    const historyWithAudio = await Promise.all(
      history?.history?.map(async (historyItem) => {
        const audio = await elevenlabs.history.getAudio(
          historyItem.history_item_id
        );
        return {
          ...historyItem,
          audio,
        };
      })
    );
    return Response.json({
      ...history,
      history: historyWithAudio,
    });
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
