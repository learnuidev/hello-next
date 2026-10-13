"use client";

import { Icons } from "@/components/ui/icons.v2";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useMemo } from "react";

import { useReaderInteractionsStore } from "../hooks/use-reader-interactions";
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
  <div className="mt-24 text-center text-gray-500 font-extralight">
    <Icons.chartColumn className="text-3xl mb-3 mx-auto" />
    <p>{title}</p>
    <p className="text-sm mt-2">{hint}</p>
  </div>
);

/**
 * The words looked up in one text, newest first, each with how many times it
 * was tapped and the line it was in.
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
    <section className="mt-12 mb-32">
      <div className="space-y-6">
        {lookups.map((item) => (
          <div
            key={`lookup-${item.id || `${item.text}::${item.sentence}`}`}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-2"
          >
            <Link
              href={getNmmLink({ id: item.text, lang: item.lang })}
              className="text-2xl font-light hover:text-rose-400 transition"
            >
              {item.text}
            </Link>

            <span className="text-xs uppercase tracking-wider text-rose-500">
              {item.lookupCount}×
            </span>

            {item.sentence && (
              <p className="w-full text-sm text-gray-500 font-light leading-7">
                {highlightReaderWord(item.sentence, item.text)}
              </p>
            )}
          </div>
        ))}
      </div>
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
    <section className="mt-12 mb-32 space-y-16">
      {wordBookmarks.length > 0 && (
        <div>
          <h2 className="text-xs uppercase tracking-wider text-gray-500">
            <span>Words</span>
            <span className="ml-2 text-gray-400">{wordBookmarks.length}</span>
          </h2>

          <div className="mt-6 space-y-6">
            {wordBookmarks.map((item) => (
              <div
                key={`word-bookmark-${item.id || `${item.text}::${item.sentence}`}`}
              >
                <div className="flex items-baseline gap-3">
                  <Icons.bookmarkSolid className="text-rose-400 text-sm" />
                  <span className="text-2xl font-light">{item.text}</span>
                </div>

                {item.sentence && (
                  <p className="mt-2 text-sm text-gray-500 font-light leading-7">
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
          <h2 className="text-xs uppercase tracking-wider text-gray-500">
            <span>Lines</span>
            <span className="ml-2 text-gray-400">
              {sentenceBookmarks.length}
            </span>
          </h2>

          <div className="mt-6 space-y-6">
            {sentenceBookmarks.map((item) => (
              <div
                key={`line-bookmark-${item.id || `${item.text}::${item.sentence}`}`}
              >
                <div className="flex items-baseline gap-3">
                  <Icons.bookmarkSolid className="text-rose-400 text-sm" />
                  <span className="text-lg font-light">{item.text}</span>
                </div>

                <p className="mt-2 text-sm text-gray-500 font-light leading-7">
                  line {item.lineIndex == null ? "—" : item.lineIndex + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
