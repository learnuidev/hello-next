"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

import { useReaderInteractionsStore } from "../hooks/use-reader-interactions";
import {
  ReaderBookmarksPanel,
  ReaderLookupsPanel,
} from "./reader-interactions-panel";
import { ReaderStats } from "./reader-stats";

type InsightsTab = "general" | "lookups" | "bookmarks";

const TABS: { id: InsightsTab; title: string }[] = [
  { id: "general", title: "General" },
  { id: "lookups", title: "Lookups" },
  { id: "bookmarks", title: "Bookmarks" },
];

/**
 * The insights view, split into tabs so each half of "how you read it" can grow
 * without crowding the other: the text's own totals, the words looked up, and
 * the words/lines bookmarked.
 */
export const ReaderInsights = ({
  readerItemId,
  text,
  lang,
}: {
  readerItemId: string;
  text: string;
  lang: string;
}) => {
  const [tab, setTab] = useState<InsightsTab>("general");

  const interactions = useReaderInteractionsStore(
    (state) => state.interactions,
  );

  const { lookupCount, bookmarkCount } = useMemo(() => {
    const items = Object.values(interactions).filter(
      (item) => item.readerItemId === readerItemId,
    );

    return {
      lookupCount: items.filter(
        (item) => item.type === "word" && item.lookupCount > 0,
      ).length,
      bookmarkCount: items.filter((item) => item.bookmarked).length,
    };
  }, [interactions, readerItemId]);

  return (
    <div>
      <div className="flex items-center gap-8 border-b border-gray-100 dark:border-gray-900">
        {TABS.map(({ id, title }) => {
          const count =
            id === "lookups"
              ? lookupCount
              : id === "bookmarks"
                ? bookmarkCount
                : null;

          return (
            <button
              key={id}
              onClick={() => {
                setTab(id);
              }}
              className={cn(
                "pb-3 text-xs uppercase tracking-wider transition border-b-2",
                tab === id
                  ? "text-gray-800 dark:text-white border-rose-400"
                  : "text-gray-400 border-transparent hover:text-rose-400",
              )}
            >
              {title}
              {count !== null && (
                <span className="ml-2 text-gray-400">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {tab === "general" && (
        <ReaderStats key={readerItemId} text={text} lang={lang} />
      )}

      {tab === "lookups" && <ReaderLookupsPanel readerItemId={readerItemId} />}

      {tab === "bookmarks" && (
        <ReaderBookmarksPanel readerItemId={readerItemId} />
      )}
    </div>
  );
};
