export interface ContentV2 {
  pk: string;
  sk: string;
  userId: string;
}

export type ContentV2Type = "youtube" | "audio" | "text" | "website";

export interface AddContentParams {
  audioId?: string;
  transcriptId?: string;
  type: ContentV2Type;
  title?: string;
  text?: string;
}

export type ContentStatus =
  | "QUEUED"
  | "PROCESSING_YOUTUBE"
  | "PROCESSING_TEXT"
  | "PROCESSING_WEBSITE"
  | "AUDIO_GENERATING"
  | "TRANSLATING"
  | "COMPLETED"
  | "FAILED"
  | "DLQ_FAILED";

export interface ListContentsParams {
  status: ContentStatus;
  limit: number;
  direction: "asc" | "desc";
  exclusiveStartKey?: string;
}
