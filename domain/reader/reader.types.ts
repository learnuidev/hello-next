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
  /** The subtitle file the lines came out of, when it was uploaded as one. */
  subtitleFileName?: string;
  /** Where that original file is kept in the assets bucket. */
  subtitleFileKey?: string;
  /** How big it is, in bytes. */
  subtitleFileSize?: number;
  /**
   * A signed link to the original file, good for a day. `get-reader-item` is the
   * one call that answers with it, because a link that is stored is a link that
   * has expired by the time it is used.
   */
  subtitleFileUrl?: string | null;
  /**
   * When each line of a subtitle text is said, in milliseconds, one per line.
   * Two flat arrays rather than a cue object per line: a film is a few thousand
   * lines, and a DynamoDB item is a few hundred kilobytes.
   */
  cueStarts?: number[];
  cueEnds?: number[];
  createdAt: number;
  updatedAt: number;
}

/** The original subtitle file, as the API takes it: base64 in the save request. */
export interface ReaderSubtitleFileParams {
  name: string;
  content: string;
}

export interface AddReaderItemParams {
  title: string;
  text: string;
  sourceUrl?: string;
  subtitleFileName?: string;
  subtitleFile?: ReaderSubtitleFileParams;
  cueStarts?: number[];
  cueEnds?: number[];
}

export interface UpdateReaderItemParams {
  id: string;
  title?: string;
  text?: string;
  sourceUrl?: string;
  subtitleFileName?: string;
  subtitleFile?: ReaderSubtitleFileParams;
  cueStarts?: number[];
  cueEnds?: number[];
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
