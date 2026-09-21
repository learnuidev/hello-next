export interface ContentCollection {
  id: string;
  userId: string;
  title: string;
  description?: string;
  totalItems: number;
  createdAt: number;
  updatedAt: number;
}

export interface ContentCollectionItem {
  id: string;
  collectionId: string;
  contentId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnailUrl?: string;
  format?: string;
  lang?: string;
  author?: string;
  seriesId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ContentCollectionWithItems extends ContentCollection {
  items: ContentCollectionItem[];
}

/**
 * The bits of a content that we persist inside a collection, so the
 * collections page can render a card without fetching the content again.
 */
export interface ContentToCollect {
  contentId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnailUrl?: string;
  format?: string;
  lang?: string;
  author?: string;
  seriesId?: string;
}

export interface ContentCollectionsByContentResponse {
  contentId: string;
  collectionIds: string[];
  collections: ContentCollection[];
  items: ContentCollectionItem[];
}
