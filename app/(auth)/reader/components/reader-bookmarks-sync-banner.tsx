"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { ReaderInteractionInput } from "@/domain/reader/reader-interactions.types";
import { syncReaderInteractions } from "@/domain/reader/use-sync-reader-interactions";
import { useEffect, useState } from "react";

import {
  LegacyReaderSnippet,
  getLegacyReaderSnippets,
  isReaderBookmarksSynced,
  markReaderBookmarksSynced,
} from "../hooks/reader-local-storage";
import {
  ReaderInteractionDraft,
  useReaderInteractionsStore,
} from "../hooks/use-reader-interactions";

/**
 * A reading-list snippet becomes either a bookmarked word (with the line it came
 * from as its context) or a bookmarked line — the reader distinguishes the two
 * by whether the saved text is the whole line or a word inside it.
 */
const toDraft = (snippet: LegacyReaderSnippet): ReaderInteractionDraft => {
  const isLine = !!snippet.line && snippet.line.line === snippet.text;

  return {
    readerItemId: snippet.readerItemId,
    readerItemTitle: snippet.readerItemTitle,
    kind: snippet.kind || "reader",
    type: isLine ? "sentence" : "word",
    text: snippet.text,
    sentence: isLine ? snippet.text : snippet.line?.line || "",
    lineIndex: snippet.line?.lineIndex ?? null,
    lang: "zh",
  };
};

/**
 * The one-time bridge for bookmarks kept in the browser before they lived on
 * the server: offers to push every saved word and line up to the account, then
 * folds them into the insights ledger and remembers not to ask again.
 */
export const ReaderBookmarksSyncBanner = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const ingestBookmarks = useReaderInteractionsStore(
    (state) => state.ingestBookmarks,
  );

  const [snippets, setSnippets] = useState<LegacyReaderSnippet[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReaderBookmarksSynced()) {
      setSnippets(getLegacyReaderSnippets());
    }
  }, []);

  if (snippets.length === 0) {
    return null;
  }

  const handleSync = async () => {
    setSyncing(true);
    setError(null);

    const inputs: ReaderInteractionInput[] = snippets.map((snippet) => ({
      ...toDraft(snippet),
      lookupCount: 0,
      bookmarked: true,
      createdAt: snippet.createdAt || Date.now(),
      updatedAt: Date.now(),
    }));

    try {
      await syncReaderInteractions(inputs, { Authorization: authUser?.jwt });
      ingestBookmarks(
        snippets.map(toDraft),
        // Already on the server: just show them, don't mark the ledger dirty.
        { markDirty: false },
      );
      markReaderBookmarksSynced();
      setSnippets([]);
    } catch (err: any) {
      setError(err?.message || "Could not sync your bookmarks");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-rose-300/40 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-950/20 px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icons.bookmarkSolid className="text-xl text-rose-400" />
          <p className="text-sm font-light text-gray-700 dark:text-gray-300">
            <span>{snippets.length}</span>
            <span>
              {snippets.length === 1
                ? " saved word or line is"
                : " saved words and lines are"}{" "}
              on this device but not on your account.
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={syncing}
            onClick={handleSync}
            className="uppercase text-xs tracking-wider text-rose-500 hover:text-rose-400 border-[1px] border-rose-300 dark:border-rose-500/40 px-4 py-2 transition disabled:opacity-50"
          >
            {syncing ? "Syncing…" : "Sync bookmarks"}
          </button>

          <button
            onClick={() => {
              setSnippets([]);
            }}
            title="Dismiss"
            className="text-gray-400 hover:text-rose-400 transition"
          >
            <Icons.xMark className="text-lg" />
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-xs text-rose-500">{error}</p>
      )}
    </div>
  );
};
