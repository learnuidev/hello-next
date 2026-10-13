/**
 * The old reader library lived entirely in localStorage under this key, shaped
 * by zustand's persist middleware as `{ state: { items, ... }, version }`. Once
 * the library moved to the server, anything left here is a text that has never
 * been synced, so these helpers read it out and clear it once it is on the way.
 */
export const LEGACY_READER_KEY = "mandarino/reader-items";

export interface LegacyReaderItem {
  id: string;
  title: string;
  text: string;
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
