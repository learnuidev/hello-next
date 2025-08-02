import { listenApiUrl } from "@/app/(auth)/listen/constants";

import { GetAudioRequest, GetAudioResponse } from "./audio.types";

export const getAudioApi = async (
  { text, lang, provider }: GetAudioRequest,
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
      provider,
    }),
  });

  const respJson = await resp.json();

  return respJson;
};
