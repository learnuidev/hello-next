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

/**
 * The views a reader text can be opened in.
 *
 * The URL is what decides which one is showing — `/reader/:id` is focused read,
 * `/reader/:id?view=insights` the insights, and so on — so a view can be linked
 * to, bookmarked and gone back to with the browser's own back button.
 */
export type ReaderViewMode =
  | "read"
  | "dynocloze"
  | "focused"
  | "insights"
  | "reading-list";

export const readerViewModes: ReaderViewMode[] = [
  "read",
  "dynocloze",
  "focused",
  "insights",
  "reading-list",
];

export const isReaderViewMode = (
  value?: string | null,
): value is ReaderViewMode =>
  !!value && (readerViewModes as string[]).includes(value);

/**
 * Opening a text lands in focused read: one line at a time is the way to read
 * a pasted text, and the other views are a click away.
 */
export const defaultReaderViewMode: ReaderViewMode = "focused";

/** The default view is the plain URL; every other view says so in the query. */
export const getReaderViewHref = (
  readerItemId: string,
  viewMode: ReaderViewMode,
) =>
  viewMode === defaultReaderViewMode
    ? `/reader/${readerItemId}`
    : `/reader/${readerItemId}?view=${viewMode}`;
