"use client";

export interface ICharacter {
  reviewHistory: {
    createdAt: number;
    timeTaken: number;
    ponderTime?: number;
    startTime: number;
    endTime: number;
    reviewDate: string;
    outcome: string;
  }[];

  contentContext: any;
  location: string;
  component: string;
  sub_components: { hanzi: string; en: string }[];
  status: string;
  createdAt: number;
  en: string;
  pinyin: string;
  story: string;
  group?: string;
  tone_level?: number;
  data_version: string;
  level: number;
  rightCount: number;
  userId: string;
  nomad: string;
  destination: string;
  journeyId: string;
  next_review_date: number;
  id: string;
  rightAt: number;
  forgottenAt: number;
  hanzi: string;
  input?: string;
  lang?: string;
  steps?: any;
  roman?: string;
  track?: boolean;
}
