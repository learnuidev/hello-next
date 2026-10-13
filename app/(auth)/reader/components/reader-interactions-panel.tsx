"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useMemo } from "react";

import { useReaderInteractionsStore } from "../hooks/use-reader-interactions";
import { readerCard, readerCardFull } from "../reader.styles";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { highlightReaderWord } from "../utils/highlight-reader-word";

const sortByUpdated = <T extends { updatedAt: number }>(items: T[]) =>
  [...items].sort((a, b) => b.updatedAt - a.updatedAt);

const useReaderItemInteractions = (readerItemId: string) => {
  const interactions = useReaderInteractionsStore(
    (state) => state.interactions,
  );

  return useMemo(() => {
    const items = Object.values(interactions).filter(
      (item) => item.readerItemId === readerItemId,
    );

    return {
      lookups: sortByUpdated(
        items.filter((item) => item.type === "word" && item.lookupCount > 0),
      ),
      wordBookmarks: sortByUpdated(
        items.filter((item) => item.type === "word" && item.bookmarked),
      ),
      sentenceBookmarks: sortByUpdated(
        items.filter((item) => item.type === "sentence" && item.bookmarked),
      ),
    };
  }, [interactions, readerItemId]);
};

const PanelEmptyState = ({
  title,
  hint,
}: {
  title: string;
  hint: string;
}) => (
  <div
    className={cn(
      readerCardFull,
      "mt-6 py-16 text-center text-gray-500 font-extralight",
    )}
  >
    <Icons.chartColumn className="text-3xl mb-3 mx-auto" />
    <p>{title}</p>
    <p className="text-sm mt-2">{hint}</p>
  </div>
);

/** The word of a row: how it is written, and how it is read. */
const InteractionWord = ({ word, lang }: { word: string; lang: string }) => (
  <div className="w-20 shrink-0">
    <Link
      href={getNmmLink({ id: word, lang })}
      className="block truncate text-xl font-semibold text-gray-800 transition hover:text-rose-400 dark:text-gray-100"
    >
      {word}
    </Link>

    <p className="mt-1 truncate text-xs text-gray-500">
      {getReaderPinyin(word)}
    </p>
  </div>
);

/**
 * The words looked up in one text, newest first: the word and its reading on the
 * left, how many times it was tapped, then the line it was tapped in.
 */
export const ReaderLookupsPanel = ({
  readerItemId,
}: {
  readerItemId: string;
}) => {
  const { lookups } = useReaderItemInteractions(readerItemId);

  if (lookups.length === 0) {
    return (
      <PanelEmptyState
        title="No words looked up yet."
        hint="Tap a word while reading to look it up — it will be tallied here."
      />
    );
  }

  return (
    <section className="mt-6 mb-32 space-y-3">
      {lookups.map((item) => (
        <div
          key={`lookup-${item.id || `${item.text}::${item.sentence}`}`}
          className={cn(
            readerCard,
            "flex flex-wrap items-start gap-x-5 gap-y-2 rounded-xl p-4 sm:p-5",
          )}
        >
          <InteractionWord word={item.text} lang={item.lang} />

          <span className="mt-1 shrink-0 rounded-full bg-gray-200/70 px-2.5 py-1 text-[11px] tabular-nums text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {item.lookupCount}×
          </span>

          {item.sentence && (
            <p className="min-w-0 flex-1 text-sm leading-7 text-gray-500">
              {highlightReaderWord(item.sentence, item.text)}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

/**
 * The words and lines bookmarked out of one text, newest first.
 */
export const ReaderBookmarksPanel = ({
  readerItemId,
}: {
  readerItemId: string;
}) => {
  const { wordBookmarks, sentenceBookmarks } =
    useReaderItemInteractions(readerItemId);

  if (wordBookmarks.length === 0 && sentenceBookmarks.length === 0) {
    return (
      <PanelEmptyState
        title="Nothing bookmarked yet."
        hint="Tap a word to bookmark it, or save a line while reading — both show up here."
      />
    );
  }

  return (
    <section className="mt-6 mb-32 space-y-10">
      {wordBookmarks.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>Words</span>
            <span className="ml-2 text-gray-400">{wordBookmarks.length}</span>
          </h2>

          <div className="mt-4 space-y-3">
            {wordBookmarks.map((item) => (
              <div
                key={`word-bookmark-${item.id || `${item.text}::${item.sentence}`}`}
                className={cn(
                  readerCard,
                  "flex flex-wrap items-start gap-x-5 gap-y-2 rounded-xl p-4 sm:p-5",
                )}
              >
                <InteractionWord word={item.text} lang={item.lang} />

                <Icons.bookmarkSolid className="mt-1.5 shrink-0 text-sm text-rose-400" />

                {item.sentence && (
                  <p className="min-w-0 flex-1 text-sm leading-7 text-gray-500">
                    {highlightReaderWord(item.sentence, item.text)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {sentenceBookmarks.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>Lines</span>
            <span className="ml-2 text-gray-400">
              {sentenceBookmarks.length}
            </span>
          </h2>

          <div className="mt-4 space-y-3">
            {sentenceBookmarks.map((item) => (
              <div
                key={`line-bookmark-${item.id || `${item.text}::${item.sentence}`}`}
                className={cn(
                  readerCard,
                  "flex items-start justify-between gap-4 rounded-xl p-4 sm:p-5",
                )}
              >
                <p className="min-w-0 flex-1 text-base leading-8 text-gray-700 dark:text-gray-200">
                  {item.text}
                </p>

                <span className="shrink-0 text-xs uppercase tracking-wider text-gray-400">
                  Line {item.lineIndex == null ? "—" : item.lineIndex + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
