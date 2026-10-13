"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useReaderInteractionsStore } from "../hooks/use-reader-interactions";
import { readerCard, readerCardShadow } from "../reader.styles";
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

const isInsightsTab = (value?: string | null): value is InsightsTab =>
  value === "general" || value === "lookups" || value === "bookmarks";

/** What each tab is, said in a heading and one line. */
const TAB_HEADINGS: Record<InsightsTab, { title: string; subtitle: string }> = {
  general: {
    title: "Text overview",
    subtitle: "How much of this text you can already read.",
  },
  lookups: {
    title: "Lookups",
    subtitle: "Words you tapped for a definition.",
  },
  bookmarks: {
    title: "Bookmarks",
    subtitle: "Words and lines you saved to review.",
  },
};

/**
 * The insights view, split into tabs so each half of "how you read it" can grow
 * without crowding the other: the text's own totals, the words looked up, and
 * the words/lines bookmarked.
 */
export const ReaderInsights = ({
  readerItemId,
  text,
  lang,
  kind,
}: {
  readerItemId: string;
  text: string;
  lang: string;
  /** Which surface the text belongs to; a reader text by default. */
  kind?: "reader" | "convo";
}) => {
  // The tab lives in the url, so a bookmark can be linked straight to — the
  // "saved" confirmation points at the Bookmarks tab by name.
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab");
  const tab: InsightsTab = isInsightsTab(tabParam) ? tabParam : "general";

  const setTab = (nextTab: InsightsTab) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("tab", nextTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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

  const heading = TAB_HEADINGS[tab];

  return (
    <div>
      {/* A pill switcher on its own card, rather than tabs under a rule. */}
      <div className="flex justify-center">
        <div
          className={cn(
            readerCard,
            readerCardShadow,
            "inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl p-1",
          )}
        >
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
                  "rounded-xl px-4 py-2 text-xs uppercase tracking-wider transition",
                  tab === id
                    ? "bg-white text-gray-800 shadow-sm dark:bg-gray-900 dark:text-white"
                    : "text-gray-500 hover:text-rose-400",
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
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {heading.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{heading.subtitle}</p>
      </div>

      {tab === "general" && (
        <ReaderStats
          key={readerItemId}
          readerItemId={readerItemId}
          text={text}
          lang={lang}
          kind={kind}
        />
      )}

      {tab === "lookups" && <ReaderLookupsPanel readerItemId={readerItemId} />}

      {tab === "bookmarks" && (
        <ReaderBookmarksPanel readerItemId={readerItemId} />
      )}
    </div>
  );
};
