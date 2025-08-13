"use client";

export interface ContentRepeatPerTranscription {
  transcriptionId: string;
  input: string;
  totalRepeats: 0;
}
export interface GetContentAnalyticsRespose {
  totalRepeats: number;
  totalTimePlayed: number;
  totalPlays: number;
  repeatsPerTranscription: ContentRepeatPerTranscription[];
  repeatsPerWord: { word: string; frequency: number }[];

  focusMode: boolean;
  focusIndex: number;
}
