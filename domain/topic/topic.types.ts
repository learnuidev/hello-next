export type TopicType =
  | "recommendation"
  | "kids"
  | "storytelling"
  | "novel"
  | "news"
  | "music"
  | "sports"
  | "chinese-classics"
  | "history"
  | "technology"
  | "science"
  | "personal-growth"
  | "travel"
  | "business"
  | "innovation"
  | "politics"
  | "lifestyle";

export interface Topic {
  type: TopicType;

  title: string;
}
