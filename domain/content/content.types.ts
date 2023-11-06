export type AddContentParams = {
  type: "convo" | "story" | "movie" | "music" | "tutorial";
  author: string;
  location: string;
  title: string;
  audio: string;
  transcriptions: any;
};
