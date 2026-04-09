"use client";

import { ConvoInsightsLearnStatusFilter } from "./convo-insights-learn-status-filter";
import { ConvoInsightsHskLevelFilter } from "./convo-insights-hsk-level-filter";
import { ConvoInsightsSearch } from "./convo-insights-search";
import { ConvoInsightsWordTable } from "./convo-insights-word-table";
import { useGetContentInsightsNew } from "../use-get-content-insights.new";
import { useMemo } from "react";
import { useInsightsSettingsStore } from "../use-insights-settings-store";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { WordSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/word-search-result";
import { ConvoInsightsViewToggle } from "./convo-insights-view-toggle";

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
  const displayMode = useInsightsSettingsStore((state) => state.displayMode);

  const { data } = useGetContentInsightsNew({ contentId });

  const availableHskLevels = useMemo(() => {
    if (!data?.filteredHskWords) return [];
    const levels = new Set<number>();

    data.filteredHskWords.forEach((word: any) => {
      if (word?.hskLevel) {
        levels.add(word.hskLevel);
      }
    });

    return Array.from(levels).sort((a, b) => a - b);
  }, [data?.filteredHskWords]);

  const hasNaItems = useMemo(() => {
    if (!data?.filteredHskWords) return false;
    return data.filteredHskWords.some((word: any) => !word?.hskLevel);
  }, [data?.filteredHskWords]);

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
          <ConvoInsightsHskLevelFilter
            availableHskLevels={availableHskLevels}
            showNa={hasNaItems}
          />
          <ConvoInsightsViewToggle />
        </div>
      </div>

      <div className="sm:my-8 my-4">
        {displayMode === "list" ? (
          <ConvoInsightsWordTable
            words={filteredWords}
            lang={lang}
            onWordClick={onWordClick}
          />
        ) : (
          <NmmListContainerAll className="md:mx-0">
            {filteredWords.map((word: any, idx: number) => {
              return (
                <HanziLink
                  character={word}
                  key={`${word?.hanzi || word?.input}-grid-${idx}`}
                  lang={lang}
                  onClick={() => onWordClick(word)}
                />
              );
            })}
          </NmmListContainerAll>
        )}
      </div>
    </div>
  );
}
