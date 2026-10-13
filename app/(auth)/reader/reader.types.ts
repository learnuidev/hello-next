/**
 * A saved reader text.
 *
 * The source of truth is the reader API (`domain/reader`), which stores each
 * text against its user; this shape mirrors that record so the reading surface
 * can stay free of the transport details.
 */
export interface ReaderItem {
  /** A uuid. Used as the React key and as the `/reader/:id` url segment. */
  id: string;
  title: string;
  text: string;
  /** The url the text was parsed from, when it was added as a url. */
  sourceUrl?: string;
  /** Timestamp of when the text was saved. The list is sorted by this. */
  createdAt: number;
  /** Timestamp of the last edit. */
  updatedAt?: number;
}

/**
 * Where in a text a saved piece came from: which line it was taken out of, and
 * the line itself.
 *
 * A word kept out of a long text is a word with a place — the bookmark can show
 * what was being said when the reader stopped to keep it, and offer the way back
 * to that line.
 */
export interface ReaderSnippetLine {
  /** The step the line is in the text, counted from zero. */
  lineIndex: number;
  line: string;
}

/**
 * The views a reader text can be opened in.
 *
 * The URL is what decides which one is showing — `/reader/:id` is focused read,
 * `/reader/:id?view=insights` the insights, and so on — so a view can be linked
 * to, bookmarked and gone back to with the browser's own back button.
 *
 * The words and lines you keep are not a view of their own: they live in the
 * insights tab, beside everything else the reader records about a text.
 */
export type ReaderViewMode = "read" | "dynocloze" | "focused" | "insights";

export const readerViewModes: ReaderViewMode[] = [
  "read",
  "dynocloze",
  "focused",
  "insights",
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
