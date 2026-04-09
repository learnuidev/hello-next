"use client";

import { ConvoInsightsCharacterStatsCard } from "./convo-insights-character-stats-card";
import { ConvoInsightsLearnStatusFilter } from "./convo-insights-learn-status-filter";
import { ConvoInsightsSearch } from "./convo-insights-search";
import { ConvoInsightsTable } from "./convo-insights-table";
import { useGetContentInsightsNew } from "../use-get-content-insights.new";
import { useMemo } from "react";
import { useInsightsSettingsStore } from "../use-insights-settings-store";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { CharacterSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/character-search-result";
import { ConvoInsightsViewToggle } from "./convo-insights-view-toggle";

export function ConvoInsightsCharacterTab({
  contentId,
  lang,
  onCharacterClick,
}: {
  contentId: string;
  lang: string;
  onCharacterClick: (char: any) => void;
}) {
  const searchQuery = useInsightsSettingsStore((state) => state.searchQuery);
  const learnStatus = useInsightsSettingsStore((state) => state.learnStatus);
  const displayMode = useInsightsSettingsStore((state) => state.displayMode);

  const { data } = useGetContentInsightsNew({ contentId });

  const characterStats = useMemo(() => {
    if (!data?.uniqueCharactersMemo) {
      return { totalNew: 0, totalLearned: 0, totalMastered: 0 };
    }

    const totalLearned = data.uniqueCharactersMemo.filter(
      (char: any) => char?.isLearned
    ).length;
    const totalMastered = data.uniqueCharactersMemo.filter(
      (char: any) => char?.status === "forgotten"
    ).length;
    const totalNew = data.uniqueCharacters.length - totalLearned;

    return { totalNew, totalLearned, totalMastered };
  }, [data?.uniqueCharactersMemo, data?.uniqueCharacters]);

  const filteredCharacters = useMemo(() => {
    if (!data?.uniqueCharactersMemo) return [];
    let filtered = data.uniqueCharactersMemo;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((char: any) => {
        return (
          (char?.hanzi || char?.input)?.toLowerCase().includes(query) ||
          char?.pinyin?.toLowerCase().includes(query) ||
          char?.en?.toLowerCase().includes(query)
        );
      });
    }

    if (learnStatus !== "all") {
      filtered = filtered.filter((char: any) => {
        if (learnStatus === "learned") {
          return char?.status === "learned" || char?.status === "DISCOVERED";
        }

        if (learnStatus === "forgotten") {
          return char?.status === "forgotten";
        }
        return !char?.isLearned;
      });
    }

    return filtered;
  }, [data?.uniqueCharactersMemo, searchQuery, learnStatus]);

  return (
    <div className="my-0 sm:my-8">
      <div className="my-4 sm:my-8 mb-4 sm:mb-12">
        <ConvoInsightsCharacterStatsCard
          totalNew={characterStats.totalNew}
          totalLearned={characterStats.totalLearned}
          totalMastered={characterStats.totalMastered}
          total={data.uniqueCharacters.length}
        />
      </div>

      <div className="sm:mb-4 flex sm:flex-row sm:justify-between flex-col gap-2">
        <ConvoInsightsSearch />
        <div className="flex gap-2">
          <ConvoInsightsLearnStatusFilter />
          <ConvoInsightsViewToggle />
        </div>
      </div>

      <div className="sm:my-8 my-4">
        {displayMode === "list" ? (
          <ConvoInsightsTable
            characters={filteredCharacters}
            lang={lang}
            onCharacterClick={onCharacterClick}
          />
        ) : (
          <NmmListContainerAll>
            {filteredCharacters.map((char: any, idx: number) => {
              return (
                <HanziLink
                  character={char}
                  key={`${char?.hanzi || char?.input}-grid-${idx}`}
                  lang={lang}
                  onClick={() => onCharacterClick(char)}
                />
              );
            })}
          </NmmListContainerAll>
        )}
      </div>
    </div>
  );
}
