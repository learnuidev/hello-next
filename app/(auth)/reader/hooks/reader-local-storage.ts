/**
 * The old reader library lived entirely in localStorage under this key, shaped
 * by zustand's persist middleware as `{ state: { items, ... }, version }`. Once
 * the library moved to the server, anything left here is a text that has never
 * been synced, so these helpers read it out and clear it once it is on the way.
 */
export const LEGACY_READER_KEY = "mandarino/reader-items";

/** The key the current reading list lives under (bookmarks are still local). */
export const READER_LOCAL_STATE_KEY = "mandarino/reader-local-state";

/** Set once the localStorage-era bookmarks have been pushed to the account. */
export const READER_BOOKMARKS_SYNCED_KEY = "mandarino/reader-bookmarks-synced";

export interface LegacyReaderItem {
  id: string;
  title: string;
  text: string;
  createdAt: number;
}

export interface LegacyReaderSnippet {
  id: string;
  text: string;
  readerItemId: string;
  readerItemTitle: string;
  kind?: "reader" | "convo";
  line?: { lineIndex: number; line: string };
  createdAt: number;
}

export const getLegacyReaderItems = (): LegacyReaderItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(LEGACY_READER_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    const items = parsed?.state?.items;

    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

/**
 * Clears the items from the legacy store, leaving any other state (reading
 * positions, reading list) alone so a partial read of the old blob never
 * resurfaces as a text to sync twice.
 */
export const clearLegacyReaderItems = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage.getItem(LEGACY_READER_KEY);

    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);

    if (parsed?.state) {
      parsed.state.items = [];
      window.localStorage.setItem(LEGACY_READER_KEY, JSON.stringify(parsed));
    }
  } catch {
    window.localStorage.removeItem(LEGACY_READER_KEY);
  }
};

/**
 * Every reading-list snippet still in the browser, from both the original store
 * key and the current one — bookmarked words and lines that predate the server
 * interactions ledger.
 */
export const getLegacyReaderSnippets = (): LegacyReaderSnippet[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const seen = new Set<string>();
  const snippets: LegacyReaderSnippet[] = [];

  [LEGACY_READER_KEY, READER_LOCAL_STATE_KEY].forEach((key) => {
    try {
      const raw = window.localStorage.getItem(key);

      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw);
      const list = parsed?.state?.readingList;

      if (Array.isArray(list)) {
        list.forEach((snippet: LegacyReaderSnippet) => {
          if (snippet?.id && !seen.has(snippet.id)) {
            seen.add(snippet.id);
            snippets.push(snippet);
          }
        });
      }
    } catch {
      // A corrupt blob is not worth failing the reader over.
    }
  });

  return snippets;
};

export const isReaderBookmarksSynced = () => {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(READER_BOOKMARKS_SYNCED_KEY) === "1";
};

export const markReaderBookmarksSynced = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(READER_BOOKMARKS_SYNCED_KEY, "1");
};
