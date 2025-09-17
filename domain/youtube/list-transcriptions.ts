import { fetchTranscript } from "youtube-transcript-plus";
import { ulid } from "ulid";
import {
  TranscriptResponse,
  TranscriptSegment,
} from "./list-transcriptions.types";

export const listTranscriptions = async ({
  videoId,
  lang,
}: {
  videoId: string;
  lang: string;
}): Promise<TranscriptSegment[]> => {
  const resp: TranscriptResponse[] = await fetchTranscript(videoId, { lang });

  const values: TranscriptSegment[] = resp.map((item) => ({
    id: ulid(),
    lang,
    input: item.text,
    start: item.offset,
    end: item.duration + item.offset,
  }));

  return values;
};
