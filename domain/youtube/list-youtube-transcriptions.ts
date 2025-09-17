import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useNewConvoStore } from "@/components/step";
import { extractYoutubeVideoIdAndTime } from "@/components/summary/parse-youtube-url";
import { useQuery } from "@tanstack/react-query";

import { fetchTranscript } from "youtube-transcript-plus";
import { TranscriptSegment } from "./list-transcriptions.types";
// import { listTranscriptions, TranscriptSegment } from "./list-transcriptions";

const listTranscriptionsApi = async ({
  url,
  lang,
  jwt,
}: {
  url: string;
  lang: string;
  jwt: string;
}): Promise<TranscriptSegment[]> => {
  const parsedUrl = extractYoutubeVideoIdAndTime(url);

  const resp = await fetch(`/api/list-subtitles`, {
    method: "POST",
    headers: {
      Authorization: jwt,
    },
    body: JSON.stringify({
      lang,
      videoId: parsedUrl.videoId,
    }),
  });

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
};

export const useListYoutubeTranscriptionsQuery = ({
  url,
  lang,
}: {
  url: string;
  lang: string;
}) => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const jwtToken = useJwtToken();
  return useQuery({
    queryKey: ["youtube/get-transcription", url, lang],
    enabled: Boolean(url),

    queryFn: async () => {
      if (url && lang) {
        const transcriptions = await listTranscriptionsApi({
          url,
          lang,
          jwt: jwtToken,
        });

        setConvo("transcriptions", transcriptions);
        return transcriptions;
      }
    },

    retry: false,
  });
};
