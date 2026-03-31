import { IStats } from "./series.types";

export enum ContentFormat {
  YOUTUBE = "youtube",
  AUDIO = "audio",
}

export enum ContentV2Type {
  YOUTUBE = "youtube",
  AUDIO = "audio",
  TEXT = "text",
  WEBSITE = "website",
}

export interface CreatedAndUpdatedAt {
  createdAt: number;
  updatedAt: number;
}

export type ContentStats = IStats;

export interface ContentV2 extends CreatedAndUpdatedAt {
  id: string;
  contentFormat: ContentFormat;
  contentV2Type: ContentV2Type;
  title: string;
  stats: ContentStats;
}
