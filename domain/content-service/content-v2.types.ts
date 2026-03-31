import { ContentFormat } from "../content-v2/content-v2.types";

export enum ContentV2Type {
  YOUTUBE = "youtube",
  AUDIO = "audio",
  TEXT = "text",
  WEBSITE = "website",
}

export enum ContentStatus {
  CREATED = "CREATED",
  QUEUED = "QUEUED",
  PROCESSING_YOUTUBE = "PROCESSING_YOUTUBE",
  PROCESSING_TEXT = "PROCESSING_TEXT",
  PROCESSING_WEBSITE = "PROCESSING_WEBSITE",
  AUDIO_GENERATING = "AUDIO_GENERATING",
  TRANSLATING = "TRANSLATING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  DLQ_FAILED = "DLQ_FAILED",
}

export interface ContentRecord {
  pk: string;
  sk: string;
  userId: string;
  contentFormat: ContentFormat;
  contentV2Type: ContentV2Type;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddContentParams {
  audioId?: string;
  transcriptId?: string;
  contentV2Type: ContentV2Type;
  title?: string;
  text?: string;
}

export interface ListContentsParams {
  status: ContentStatus;
  limit: number;
  direction: "asc" | "desc";
  exclusiveStartKey?: string;
}

export type SortDirection = "asc" | "desc";
