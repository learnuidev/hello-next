import { CreatedAndUpdatedAt } from "./content-v2.types";

export enum ContentFormat {
  YOUTUBE = "youtube",
  AUDIO = "audio",
}

interface BaseTranscription {
  id: string;
  startIndex: number;
  endIndex: number;
}

export interface YoutubeTranscription extends BaseTranscription {
  hanzi: string;
  pinyin: string;
  chinglish: string;
  en: string;
}

export interface AudioTranscriptWord {
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
  input: string;
}

export interface AudioTranscription extends BaseTranscription {
  words: AudioTranscriptWord[];
}

export type TranscriptionV2 = YoutubeTranscription | AudioTranscription;

export type ContentDetailsV2 = CreatedAndUpdatedAt & {
  id: string;
  mediaUrl: string;
  contentFormat: ContentFormat;
  transcriptions: TranscriptionV2;
};
