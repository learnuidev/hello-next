export type ContentV2Variants = "youtube" | "audio" | "video" | "text";
// | "bilibili";

export interface IContentV2 {
  id: string;
  type: ContentV2Variants;
}

export type ContentV2WithComponent = {
  id: string;
  title: string;
  Component: React.ComponentType;
};
