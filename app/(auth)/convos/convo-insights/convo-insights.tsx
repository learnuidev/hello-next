"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useSelectedCharacter } from "../use-selected-character";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useGetContentInsightsNew } from "../use-get-content-insights.new";
import { useInsightsSettingsStore } from "../use-insights-settings-store";
import { ConvoContextDialog } from "./convo-context-dialog";
import { ConvoInsightsCharacterStatsCard } from "./convo-insights-character-stats-card";
import { ConvoInsightsLearnStatusFilter } from "./convo-insights-learn-status-filter";
import { ConvoInsightsNoNChinese } from "./convo-insights-non-chinese";
import { ConvoInsightsSearch } from "./convo-insights-search";
import { ConvoInsightsTable } from "./convo-insights-table";
import { ConvoInsightsTabs } from "./convo-insights-tabs";

export function ConvoInsights({ contentId }: { contentId: string }) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const searchQuery = useInsightsSettingsStore((state) => state.searchQuery);
  const learnStatus = useInsightsSettingsStore((state) => state.learnStatus);
  const [selected, setSelected] = useState(null);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: lesson, isLoading } = useGetContentQuery({
    contentId: contentId,
  }) as any;

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

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

  const filteredWords = useMemo(() => {
    if (!data?.filteredHskWords) return [];
    if (!searchQuery) return data.filteredHskWords;
    const query = searchQuery.toLowerCase();
    return data.filteredHskWords.filter((word: any) => {
      return (
        (word?.hanzi || word?.input)?.toLowerCase().includes(query) ||
        word?.pinyin?.toLowerCase().includes(query) ||
        word?.en?.toLowerCase().includes(query)
      );
    });
  }, [data?.filteredHskWords, searchQuery]);

  const setSearchQuery = useInsightsSettingsStore(
    (state) => state.setSearchQuery
  );

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  const {
    masteryRate,
    understandingRate,
    uniqueCharactersMemo,
    totalNewCharaters,
    uniqueCharacters,
  } = data;

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="px-2 sm:px-12 mt-12">
      {/* <ConvoInsightOverview contentId={contentId} /> */}

      {/* <TotalPlaysChart contentId={contentId} /> */}

      <ConvoInsightsNoNChinese contentId={contentId}>
        <div className="w-full px-4 my-4 md:my-8">
          {selected && (
            <ConvoContextDialog
              selected={selected}
              contentId={contentId}
              isOpen={!!selected}
              closeDialog={() => {
                setSelected(null);
              }}
            />
          )}
          <div>
            <div className="mb-0 sm:mb-8">
              <ConvoInsightsTabs />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={viewType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewType === "character" && (
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
                      <ConvoInsightsLearnStatusFilter />
                    </div>

                    <div className="sm:my-8 my-4">
                      <ConvoInsightsTable
                        characters={filteredCharacters}
                        lang={lang}
                        onCharacterClick={(char) => setSelected(char)}
                      />
                    </div>
                  </div>
                )}

                {viewType === "word" && (
                  <div className="my-8">
                    <NmmListContainerAll className="gap-4">
                      {filteredWords?.map((char: any, idx: number) => {
                        return (
                          <HanziLink
                            lang={lang}
                            frequency={char?.frequency}
                            character={char}
                            key={`${char?.hanzi}-words-${idx}`}
                          />
                        );
                      })}
                    </NmmListContainerAll>
                  </div>
                )}

                {viewType === "sentence" && (
                  <div className="my-8 text-center text-gray-500 dark:text-gray-400">
                    <p>句子功能即将推出...</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ConvoInsightsNoNChinese>
    </div>
  );
}
