export type ContentType =
  | "text"
  | "web"
  | "all"
  | "podcast"
  | "audiobook"
  | "music";
export type FilterType = "date-added" | "date-listened" | "alphabetical";

export type ListenMediaStatus = "file-added" | "transcript-generated";

export type ListenMedia = {
  type: ContentType;
  lastUpdated: number;
  createdAt: number;
  id: string;
  text: string;
  progress: number;
  lastListened?: number;
  status: ListenMediaStatus;
  userId: string;
};
