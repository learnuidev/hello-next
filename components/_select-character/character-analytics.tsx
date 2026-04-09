"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useSelectedCharacter } from "../../app/(auth)/convos/use-selected-character";

import { useListCharactersMapQuery } from "@/domain/lesson/character.queries";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { HanziLink } from "@/components/hanzi-link";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";

import { ConvoInsightOverview } from "@/app/(auth)/convos/convo-insights/convo-insight-overview";
import { useGetContentInsights } from "@/app/(auth)/convos/convo-insights/hooks/use-content-insights";
import { useInsightsSettingsStore } from "@/app/(auth)/convos/use-insights-settings-store";
import { ConvoInsightsLearnStatusFilter } from "@/app/(auth)/convos/convo-insights/convo-insights-learn-status-filter";
import { ConvoInsightsHskLevelFilter } from "@/app/(auth)/convos/convo-insights/convo-insights-hsk-level-filter";
import { ConvoInsightsFrequencyFilter } from "@/app/(auth)/convos/convo-insights/convo-insights-frequency-filter";
import { CharacterSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/character-search-result";
import { WordSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/word-search-result";
import { useMemo } from "react";
import { useSegmentTextQuery } from "@/libs/utils/segment-text";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";

function getTotalFrequency(text: string, word: string): number {
  if (!text || !word) return 0;

  // Create a regular expression to match the word as a whole word (case-insensitive)
  // Using word boundaries (\b) to match whole words only
  const regex = new RegExp(
    `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
    "gi"
  );

  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

export function CharacterAnalytics({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) {
  const { totalTimePlayed, totalPlays } = useGetContentInsights({
    contentId: characterId,
  });

  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const displayMode = useInsightsSettingsStore((state) => state.displayMode);
  const setDisplayMode = useInsightsSettingsStore(
    (state) => state.setDisplayMode
  );
  const sortType = useInsightsSettingsStore((state) => state.sortType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const learnStatus = useInsightsSettingsStore((state) => state.learnStatus);
  const hskLevel = useInsightsSettingsStore((state) => state.hskLevel);
  const frequencyFilter = useInsightsSettingsStore(
    (state) => state.frequencyFilter
  );

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: hskWords } = useListHSKWordsQuery();

  const { data: learnedCharacters } = useListCharactersMapQuery({
    from: "character-analytics",
  });

  const { data: segmentedText } = useSegmentTextQuery({
    text: characterId,
    lang,
    filterOptions: ["unique"],
  });

  const { data: grammar } = useListGrammarsQuery({
    sentenceId: characterId,
    content: characterId,
    lang: lang,
    filterOptions: ["unique"],
  });

  const filteredHskWords = useMemo(() => {
    return (grammar?.grammarAnalysis || segmentedText)?.map((item) => {
      const hanzi = item?.input || item?.hanzi || "";
      const hskWord = hskWords?.find((word: any) => word.hanzi === hanzi);

      const totalFrequency = getTotalFrequency(characterId, hanzi);

      if (hskWord) {
        return {
          ...hskWord,
          totalFrequency: totalFrequency,
        };
      } else {
        return {
          ...item,
          totalFrequency: totalFrequency,
          hskLevel: "N/A",
        };
      }
    });
  }, [segmentedText, hskWords, grammar]);

  const characterAnalytics = useGetCharacterAnalytics({
    characterId,
    lang,
  });

  const {
    precisionRate,
    totalCharacters,
    totalNewCharaters,
    uniqueCharacters,
    masteryRate,
  } = characterAnalytics;

  console.log("CHAR ANALYTICS", characterAnalytics);

  // if (isLoading) {
  //   return (
  //     <div className=" px-4 md:px-32 my-4 md:my-8">
  //       <div className="text-center my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
  //         ...
  //       </div>
  //     </div>
  //   );
  // }

  const characterStats = useMemo(() => {
    const stats = uniqueCharacters?.map((char: any, idx: number) => {
      if (!char) return null;
      const isLearned = learnedCharacters?.[char];

      const totalFrequency = characterId
        ?.split("")
        .filter((item) => item === char);
      if (isLearned) {
        const reviewedHistory = isLearned?.reviewHistory || [];
        const corrects = reviewedHistory?.map(
          (item: any) => item?.outcome === "correct"
        );
        const incorrects = reviewedHistory?.map(
          (item: any) => item?.outcome === "incorrect"
        );
        return {
          ...isLearned,
          totalAttempts: reviewedHistory?.length,
          totalCorecct: corrects?.length,
          totalIncorrect: incorrects?.length,
          totalFrequency: totalFrequency?.length,
        };
      }

      const item = isLearned || {
        hanzi: char,
        pinyin: "",
        en: "",
        totalAttempts: 0,
        totalCorecct: 0,
        totalIncorrect: 0,
        totalFrequency: totalFrequency?.length,
      };

      return item;
    });

    if (sortType === "popular") {
      return stats?.sort(
        (a: any, b: any) => b?.totalFrequency - a?.totalFrequency
      );
    }
    return stats;
  }, [uniqueCharacters, learnedCharacters, sortType]);

  const availableHskLevels = useMemo(() => {
    if (!filteredHskWords) return [];
    const levels = new Set<number>();

    filteredHskWords.forEach((word: any) => {
      if (word?.hskLevel && word.hskLevel !== "N/A") {
        levels.add(parseInt(word.hskLevel, 10));
      }
    });

    return Array.from(levels).sort((a, b) => a - b);
  }, [filteredHskWords]);

  const hasNaItems = useMemo(() => {
    if (!filteredHskWords) return false;
    return filteredHskWords.some((word: any) => word?.hskLevel === "N/A");
  }, [filteredHskWords]);

  const filteredCharacterStats = useMemo(() => {
    let filtered = characterStats;

    if (learnStatus !== "all") {
      filtered = filtered?.filter((char: any) => {
        if (learnStatus === "learned") {
          return char?.status === "learned" || char?.status === "DISCOVERED";
        }

        if (learnStatus === "forgotten") {
          return char?.status === "forgotten";
        }
        return !char?.status;
      });
    }

    if (frequencyFilter !== "all") {
      filtered = filtered?.filter((char: any) => {
        const freq = char?.totalFrequency || 0;
        if (frequencyFilter === "high") {
          return freq >= 3;
        }
        if (frequencyFilter === "medium") {
          return freq >= 2 && freq < 3;
        }
        if (frequencyFilter === "low") {
          return freq === 1;
        }
        return true;
      });
    }

    return filtered;
  }, [characterStats, learnStatus, frequencyFilter]);

  const filteredWords = useMemo(() => {
    let filtered = filteredHskWords;

    if (hskLevel !== "all") {
      filtered = filtered?.filter((word: any) => {
        if (hskLevel === "na") {
          return !word?.hskLevel || word?.hskLevel === "N/A";
        }
        return parseInt(word?.hskLevel, 10) === hskLevel;
      });
    }

    if (frequencyFilter !== "all") {
      filtered = filtered?.filter((word: any) => {
        const freq = word?.totalFrequency || 0;
        if (frequencyFilter === "high") {
          return freq >= 3;
        }
        if (frequencyFilter === "medium") {
          return freq >= 2 && freq < 3;
        }
        if (frequencyFilter === "low") {
          return freq === 1;
        }
        return true;
      });
    }

    if (sortType === "popular") {
      return filtered?.sort(
        (a: any, b: any) => b?.totalFrequency - a?.totalFrequency
      );
    }
    return filtered;
  }, [filteredHskWords, hskLevel, frequencyFilter, sortType]);

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="w-full px-4 my-4 md:my-8">
      {totalPlays > 0 && (
        <ConvoInsightOverview
          contentId={characterId}
          data={[
            {
              id: "total-time-played-ca",
              stat: totalTimePlayed,
              title: "Total Minutes Played",
            },

            { id: "total-plays-ca", stat: totalPlays, title: "Total Plays" },
          ]}
        />
      )}
      <div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex justify-start space-x-4 sm:space-x-16">
            <h2 className="text-xl sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300">
              {totalCharacters}{" "}
              <span className="text-sm md:text-xl">total </span>
            </h2>
            <h2 className="text-xl sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
              <span className="text-yellow-500"> {totalNewCharaters}</span>
              <span className="text-sm md:text-xl">new </span>
            </h2>
          </div>

          <div className="flex space-x-2 sm:space-x-8">
            <h2 className="text-lg sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
              <span>
                <Icons.fireDuoTone />
              </span>
              <span className="text-gray-300"> {masteryRate}</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
          <div className="flex space-x-8">
            <button
              onClick={() => {
                setViewType("character");
              }}
              className={cn(
                viewType === "character" ? "dark:text-white" : " text-gray-500",
                "px-0 "
              )}
            >
              <Icons.seedling className="text-xl md:text-2xl" />
            </button>
            <button
              onClick={() => {
                setViewType("word");
              }}
              className={cn(
                viewType === "word" ? "dark:text-white" : " text-gray-500",
                "px-0"
              )}
            >
              <Icons.tree className="text-xl md:text-2xl" />
            </button>
          </div>

          <div className="flex gap-8 flex-wrap">
            <div className="flex flex-row gap-4">
              {viewType === "character" && (
                <>
                  <ConvoInsightsLearnStatusFilter />
                  <ConvoInsightsFrequencyFilter />
                </>
              )}
              {viewType === "word" && (
                <>
                  <ConvoInsightsHskLevelFilter
                    availableHskLevels={availableHskLevels}
                    showNa={hasNaItems}
                  />
                  <ConvoInsightsFrequencyFilter />
                </>
              )}
            </div>

            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  setDisplayMode("grid");
                }}
                className={cn(
                  displayMode === "grid" ? "dark:text-white" : "text-gray-500",
                  "px-0"
                )}
              >
                <Icons.apps className="text-xl md:text-2xl" />
              </button>
              <button
                onClick={() => {
                  setDisplayMode("list");
                }}
                className={cn(
                  displayMode === "list" ? "dark:text-white" : "text-gray-500",
                  "px-0"
                )}
              >
                <Icons.list className="text-xl md:text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {viewType === "character" && (
          <div className="my-8">
            {displayMode === "grid" ? (
              <NmmListContainerAll>
                {filteredCharacterStats?.map((char: any, idx: number) => {
                  return (
                    <HanziLink
                      character={char}
                      key={`${JSON.stringify(char)}-chars-${idx}`}
                    />
                  );
                })}
              </NmmListContainerAll>
            ) : (
              <CharacterSearchResult searchResults={filteredCharacterStats} />
            )}
          </div>
        )}

        {viewType === "word" && (
          <div className="my-8">
            {displayMode === "grid" ? (
              <NmmListContainerAll className="md:mx-0">
                {filteredWords?.map((char: any, idx: number) => {
                  return (
                    <HanziLink
                      character={char}
                      key={`${char?.hanzi}-chars-${idx}`}
                    />
                  );
                })}
              </NmmListContainerAll>
            ) : (
              <WordSearchResult words={filteredWords} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
