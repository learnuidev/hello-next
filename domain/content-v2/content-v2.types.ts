import { IStats } from "./series.types";
import { TopicType } from "../topic/topic.types";

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

export type ContentStats = IStats;

export interface ContentV2 extends CreatedAndUpdatedAt {
  id: string;
  topicType: TopicType;
  format: ContentFormat;
  title: string;
  mediaUrl: string;
  thumbnailUrl: string;
  stats: ContentStats;
}
