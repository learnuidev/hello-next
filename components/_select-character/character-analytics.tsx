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
import { CharacterSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/character-search-result";
import { WordSearchResult } from "@/app/(auth)/insights/insights-v2/precision-insight-view/word-search-result";
import { useMemo } from "react";
import { useSegmentTextQuery } from "@/libs/utils/segment-text";

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

  const filteredHskWords = useMemo(() => {
    return segmentedText?.map((item) => {
      const hskWord = hskWords?.find((word: any) => word.hanzi === item.input);

      if (hskWord) {
        return {
          ...hskWord,
          totalFrequency: item?.totalFrequency,
        };
      } else {
        return {
          ...item,
          totalFrequency: item?.totalFrequency,
          hskLevel: "N/A",
        };
      }
    });
  }, [segmentedText, hskWords]);

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
    return uniqueCharacters?.map((char: any, idx: number) => {
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
  }, [uniqueCharacters, learnedCharacters]);

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

        <div className="flex justify-between items-center my-8">
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

          <div className="flex space-x-4">
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

        {viewType === "character" && (
          <div className="my-8">
            {displayMode === "grid" ? (
              <NmmListContainerAll>
                {characterStats?.map((char: any, idx: number) => {
                  return (
                    <HanziLink
                      character={char}
                      key={`${JSON.stringify(char)}-chars-${idx}`}
                    />
                  );
                })}
              </NmmListContainerAll>
            ) : (
              <CharacterSearchResult searchResults={characterStats} />
            )}
          </div>
        )}

        {viewType === "word" && (
          <div className="my-8">
            {displayMode === "grid" ? (
              <NmmListContainerAll className="md:mx-0">
                {filteredHskWords?.map((char: any, idx: number) => {
                  return (
                    <HanziLink
                      character={char}
                      key={`${char?.hanzi}-chars-${idx}`}
                    />
                  );
                })}
              </NmmListContainerAll>
            ) : (
              <WordSearchResult words={filteredHskWords} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
