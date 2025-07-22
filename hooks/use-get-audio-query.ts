import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";

type SpeechMarkChunk = {
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  type: "word";
  value: string;
};

type SpeechMarks = {
  chunks: SpeechMarkChunk[];
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  type: "sentence";
  value: string;
};

type GetAudioResponse = {
  lastUpdated: number; // Unix timestamp in milliseconds
  speechMarks: SpeechMarks;
  id: string;
  s3Key: string;
  audioUrl: string;
};

interface GetAudioRequest {
  text: string;
  lang: string;
}

const getAudioApi = async (
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

export const useGetAudioQuery = ({
  text,
  lang,
}: {
  text: string;
  lang: string;
}) => {
  const jwt = useJwtToken();
  return useQuery({
    queryKey: ["use-get-audio", text, lang],
    queryFn: async () => {
      const audio = await getAudioApi({ text, lang }, { jwt });

      return audio;
    },
  });
};
