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
