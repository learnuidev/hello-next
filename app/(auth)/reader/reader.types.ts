/**
 * A saved reader text.
 *
 * For now everything lives in localStorage (see `use-reader-store`), so the
 * whole entry has to be self contained — there is no server side record to
 * look anything up from.
 */
export interface ReaderItem {
  /** A uuid. Used as the React key and as the `/reader/:id` url segment. */
  id: string;
  title: string;
  text: string;
  /** Timestamp of when the text was saved. The list is sorted by this. */
  createdAt: number;
}

/**
 * A piece of a text the reader kept: words or a line picked while reading,
 * waiting to be gone through again (or looked up in nmm).
 */
export interface ReaderSnippet {
  id: string;
  text: string;
  /** The text it was saved from, so the list can point back at it. */
  readerItemId: string;
  readerItemTitle: string;
  createdAt: number;
}

/** The views a reader text can be read in. */
export type ReaderViewMode =
  | "read"
  | "dynocloze"
  | "focused"
  | "stats"
  | "list";
