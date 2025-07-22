import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { GetAudioRequest, GetAudioResponse } from "./audio.types";

export const getAudioApi = async (
  { text, lang }: GetAudioRequest,
  { jwt }: { jwt: string }
): Promise<GetAudioResponse> => {
  const resp = await fetch(`${listenApiUrl}/v1/get-audio`, {
    method: "POST",
    headers: {
      Authorization: jwt,
    },
    body: JSON.stringify({
      text,
      lang,
    }),
  });

  const respJson = await resp.json();

  return respJson;
};
