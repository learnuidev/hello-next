import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { ListenMedia } from "../listen.types";
import { listenApiUrl } from "../constants";

type StatusHistoryItem =
  | "file-added"
  | "generating-transcript"
  | "transcript-generated"
  | "translating-transcript"
  | "transcript-translated";

interface StatusHistoryEntry {
  type: StatusHistoryItem;
  createdAt: number;
}

export interface SpeechMarkChunk {
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  type: "word";
  value: string;
}

interface SpeechMarks {
  chunks: SpeechMarkChunk[];
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  type: "sentence";
  value: string;
}

export interface MediaTranslation {
  input: string;
  pinyin: string;
  endChunkIndex: number;
  roman: string;
  en: string;
  startChunkIndex: number;
  lang: string;
  updatedAt: number;
}

type HumanAudioTimestampWord = SpeechMarkChunk & {
  speaker_id: string;
};

interface HumanAudioTimestamps {
  words: HumanAudioTimestampWord[];
  additional_formats: null;
  language_code: string;
  text: string;
  language_probability: number;
}

interface MediaFile {
  lastUpdated: number;
  humanAudioTimestamps: HumanAudioTimestamps;
  speechMarks: SpeechMarks;
  translations: MediaTranslation[];
  audioFormat: string;
  signedUrl: string;
  billableCharactersCount: number;
  id: string;
  s3Key: string;
  audioUrl: string;
}

interface MediaDetails {
  lastUpdated: number;
  mediaFileId: string;
  userId: string;
  status: StatusHistoryItem;
  createdAt: number;
  text: string;
  id: string;
  lang: string;
  s3Key: string;
  statusHistory: StatusHistoryEntry[];
  type: string;
  mediaFile: MediaFile;
  customAudioUrl: string;
  customAudioId: string;
}

const getMedia = async (
  jwt: string,
  mediaId: string
): Promise<MediaDetails> => {
  const resp = await fetch(`${listenApiUrl}/v1/get-media`, {
    method: "POST",

    body: JSON.stringify({ mediaId }),
    headers: {
      Authorization: jwt,
    },
  });

  const mediaList = await resp.json();

  return mediaList as MediaDetails;
};

export const useGetMediaQuery = (id: string) => {
  const jwt = useJwtToken();

  return useQuery({
    queryKey: ["get-media", jwt],
    queryFn: async () => {
      const media = await getMedia(jwt, id);

      return media;
    },
  });
};
