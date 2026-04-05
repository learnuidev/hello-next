"use client";

import { ConvoInsightsLearnStatusFilter } from "./convo-insights-learn-status-filter";
import { ConvoInsightsHskLevelFilter } from "./convo-insights-hsk-level-filter";
import { ConvoInsightsSearch } from "./convo-insights-search";
import { ConvoInsightsWordTable } from "./convo-insights-word-table";
import { useGetContentInsightsNew } from "../use-get-content-insights.new";
import { useMemo } from "react";
import { useInsightsSettingsStore } from "../use-insights-settings-store";

export function ConvoInsightsWordTab({
  contentId,
  lang,
  onWordClick,
}: {
  contentId: string;
  lang: string;
  onWordClick: (word: any) => void;
}) {
  const searchQuery = useInsightsSettingsStore((state) => state.searchQuery);
  const hskLevel = useInsightsSettingsStore((state) => state.hskLevel);

  const { data } = useGetContentInsightsNew({ contentId });

  const filteredWords = useMemo(() => {
    if (!data?.filteredHskWords) return [];
    let filtered = data.filteredHskWords;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((word: any) => {
        return (
          (word?.hanzi || word?.input)?.toLowerCase().includes(query) ||
          word?.pinyin?.toLowerCase().includes(query) ||
          word?.en?.toLowerCase().includes(query)
        );
      });
    }

    if (hskLevel !== "all") {
      filtered = filtered.filter((word: any) => {
        if (hskLevel === "na") {
          return !word?.hskLevel;
        }
        return word?.hskLevel === hskLevel;
      });
    }

    return filtered;
  }, [data?.filteredHskWords, searchQuery, hskLevel]);

  return (
    <div className="my-0 sm:my-8">
      <div className="sm:mb-4 flex sm:flex-row sm:justify-between flex-col gap-2">
        <ConvoInsightsSearch />
        <div className="flex gap-2">
          <ConvoInsightsLearnStatusFilter />
          <ConvoInsightsHskLevelFilter />
        </div>
      </div>

      <div className="sm:my-8 my-4">
        <ConvoInsightsWordTable
          words={filteredWords}
          lang={lang}
          onWordClick={onWordClick}
        />
      </div>
    </div>
  );
}
