import { IStats } from "./series.types";

type ContentFormat = "youtube" | "audio" | "video";

type ContentStats = IStats & {};
export interface ContentV2 {
  id: string;
  contentFormat: ContentFormat;
  title: string;

  stats: ContentStats;
}

type TranscriptV2Word = {
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
  input: string;
};

export type TranscriptionV2 = {
  id: string;
  hanzi: string;
  pinyin: string;
  chinglish: string;
  en: string;
  startIndex: number;
  endIndex: number;
};

export interface ContentDetailsV2 {
  id: string;
  mediaUrl: string;
  transcriptions: TranscriptionV2;
}
