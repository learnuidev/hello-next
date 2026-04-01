import { ContentStatus } from "../content-service/content-v2.types";
import { CoreStats } from "./series.types";

export enum ContentFormat {
  YOUTUBE = "youtube",
  AUDIO = "audio",
  TEXT = "text",
  WEBSITE = "website",
}

export interface CreatedAndUpdatedAt {
  createdAt: number;
  updatedAt: number;
}

export interface ContentStats extends CoreStats {}

export interface ContentV2Entity extends CreatedAndUpdatedAt {
  id: string;
  format: ContentFormat;
  status: ContentStatus;
  title: string;
  lang: string;
  sk: string;

  mediaTranscriptionsId: string;
  mediaId: string;

  stats: ContentStats;
}

export interface ContentV2 extends ContentV2Entity {
  mediaUrl: string;
  thumbnailUrl: string;
}
