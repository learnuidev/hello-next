import { IStats } from "./series.types";

type ContentFormat = "youtube" | "audio";

type ContentStats = IStats & {};
export interface ContentV2 {
  id: string;
  contentFormat: ContentFormat;
  title: string;

  stats: ContentStats;
}

export type YoutubeTranscription = {
  id: string;
  hanzi: string;
  pinyin: string;
  chinglish: string;
  en: string;
  startIndex: number;
  endIndex: number;
};

type AudioTranscriptWord = {
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
  input: string;
};

export type AudioTranscription = YoutubeTranscription & {
  words: AudioTranscriptWord[];
};

export type TranscriptionV2 = YoutubeTranscription | AudioTranscription;

export interface ContentDetailsV2 {
  id: string;
  mediaUrl: string;
  transcriptions: TranscriptionV2;
}

export interface ContentDetailsResponse {
  format: ContentFormat;
  details: ContentDetailsV2;
}
