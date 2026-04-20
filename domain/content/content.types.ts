export type AddContentParams = {
  type: "text" | "website" | "audio" | "youtube";
  contentType: "convo" | "story" | "movie" | "music" | "tutorial" | "news";
  author?: string;
  location?: string;
  title?: string;
  audio?: string;
  transcriptions?: any;
  lang?: string;
  contentUrl?: string;
  websiteUrl?: string;
  backgroundImageId: string;
} & any;
