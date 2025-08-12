export interface ListCharacterContentsQuery {
  content?: string;
  fetchType: "content" | "user";
}

type ImageDetail = {
  en: string;
  hanzi: string;
  pinyin: string;
};

type ImageMetadata = {
  createdAt: number;
  details: ImageDetail[];
};

export type CharacterContents = {
  content: string;
  imageMetadata: ImageMetadata;
  userIdAndContent: string;
  userId: string;
  updatedAt: number;
  extension: string;
  createdAt: number;
  uploadBucketKey: string;
  id: string;
  name: string;
  contentType: string;
  sourceUrl: string;
};
