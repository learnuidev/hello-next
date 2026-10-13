/**
 * What the reader keeps about how a text was actually read: a word looked up,
 * a word bookmarked, a line bookmarked. Lookups carry a count of how many times
 * the word was tapped, and everything carries the context sentence it was taken
 * out of, so the insights tab can say what was being read when it was kept.
 */
export type ReaderInteractionType = "word" | "sentence";

export interface ReaderInteraction {
  id: string;
  readerItemId: string;
  readerItemTitle: string;
  kind: "reader" | "convo";
  type: ReaderInteractionType;
  /** The word, or the sentence itself for a sentence bookmark. */
  text: string;
  /** The context sentence the word (or bookmark) came from. */
  sentence: string;
  lineIndex: number | null;
  lang: string;
  /** How many times this word was tapped. Word interactions only. */
  lookupCount: number;
  bookmarked: boolean;
  createdAt: number;
  updatedAt: number;
}

/** The shape the client sends to `/v1/reader-interactions/sync`. */
export type ReaderInteractionInput = Omit<ReaderInteraction, "id" | "createdAt"> & {
  createdAt?: number;
};

export interface ListReaderInteractionsResponse {
  items: ReaderInteraction[];
}
