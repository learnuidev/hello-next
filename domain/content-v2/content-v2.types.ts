import { IStats } from "./series.types";

export enum ContentFormat {
  YOUTUBE = "youtube",
  AUDIO = "audio",
}

export interface CreatedAndUpdatedAt {
  createdAt: number;
  updatedAt: number;
}

export type ContentStats = IStats;

export type ContentV2 = CreatedAndUpdatedAt & {
  id: string;
  contentFormat: ContentFormat;
  title: string;
  stats: ContentStats;
};
