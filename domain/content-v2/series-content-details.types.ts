import { CreatedAndUpdatedAt } from "./content-v2.types";

export enum ContentFormat {
  YOUTUBE = "youtube",
  AUDIO = "audio",
  TEXT = "text",
  WEBSITE = "website",
}

export interface YoutubeTranscription {
  id: string;
  startIndex: number;
  endIndex: number;
  start: number;
  end: number;
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

export interface AudioTranscription {
  id: string;
  startIndex: number;
  endIndex: number;
  hanzi: string;
  pinyin: string;
  chinglish: string;
  en: string;
  words: AudioTranscriptWord[];
}

export type TranscriptionV2 = YoutubeTranscription | AudioTranscription;

export interface SeriesContentDetails extends CreatedAndUpdatedAt {
  id: string;
  topicType: string;
  format: ContentFormat;
  status: string;
  title: string;
  lang: string;
  seriesId: string;
  mediaTranscriptionsId: string;
  mediaId: string;
  youtubeUrl?: string;
  mediaUrl?: string;
  transcriptions?: TranscriptionV2[];
  sortOrder: number;
}
