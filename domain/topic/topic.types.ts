export interface Topic {
  type:
    | "recommendation"
    | "kids"
    | "storytelling"
    | "news"
    | "music"
    | "sports"
    | "chinese-classics"
    | "history"
    | "technology"
    | "science"
    | "personal-growth"
    | "travel"
    | "economics-and-finance"
    | "politics"
    | "lifestyle";

  title: string;
}
