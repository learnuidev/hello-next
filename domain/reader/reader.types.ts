/**
 * A saved reader text, as the reader API stores it.
 *
 * This is the backend shape (`domain/reader`); the app's own `ReaderItem` in
 * `app/(auth)/reader/reader.types.ts` mirrors it for the reading surface.
 */
export interface ReaderItem {
  id: string;
  userId: string;
  title: string;
  text: string;
  /** The url the text was parsed from, when it was added as a url. */
  sourceUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface AddReaderItemParams {
  title: string;
  text: string;
  sourceUrl?: string;
}

export interface UpdateReaderItemParams {
  id: string;
  title?: string;
  text?: string;
  sourceUrl?: string;
}

export interface ListReaderItemsResponse {
  items: ReaderItem[];
  pagination: {
    direction: "asc" | "desc";
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}
