"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useSelectedCharacter } from "./use-selected-character";

import {
  GreenLightbulbDuoTone,
  Icons,
  RedFireDuoTone,
} from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { useGetContentInsightsNew } from "./use-get-content-insights.new";
import { useInsightsSettingsStore } from "./use-insights-settings-store";

const getFrequency = ({ lesson, input }: any) => {
  const transcriptions = lesson?.transcriptions?.filter(
    (transcription: any) => {
      return (transcription?.hanzi || transcription?.input)?.includes(input);
    }
  );

  return transcriptions?.length;
};

export function ConvoInsights({ lessonId }: { lessonId: string }) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const sortType = useInsightsSettingsStore((state) => state.sortType);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: lesson, isLoading } = useGetContentQuery({
    contentId: lessonId,
  });

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

  const { data: learnedCharacters } = useListCharactersQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const { data } = useGetContentInsightsNew({ lessonId });
  // const {
  //   understandingRate,
  //   filteredHskWords,
  //   uniqueCharactersMemo,
  //   totalNewCharaters,
  //   uniqueCharacters,
  // } = useGetContentInsights({ lessonId });

  if (isLoading || !data) {
    return <LottieLoadingAnimation />;
  }

  const {
    masteryRate,
    understandingRate,
    filteredHskWords,
    uniqueCharactersMemo,
    totalNewCharaters,
    uniqueCharacters,
  } = data;

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="w-full px-4 my-4 md:my-8">
      <div>
        <div>
          <div className="flex justify-between w-full">
            <div className="flex justify-start space-x-4 sm:space-x-16">
              <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-800 dark:text-gray-300">
                {uniqueCharacters?.length}{" "}
                <span className="text-sm md:text-xl">total chars </span>
              </h2>
              <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-800 dark:text-gray-300 space-x-2">
                <span className="text-yellow-500">
                  {" "}
                  {uniqueCharacters?.length - totalNewCharaters}
                </span>
                <span className="text-sm md:text-xl">new chars </span>
              </h2>
            </div>

            <div className="flex gap-8 my-4 text-2xl">
              <h2 className="font-extralight text-gray-500 dark:text-gray-300 space-x-2">
                <RedFireDuoTone />
                <span className="dark:text-gray-300 text-gray-900">
                  {masteryRate}
                </span>
              </h2>

              <h2 className="font-extralight text-gray-500 dark:text-gray-300 space-x-2">
                <GreenLightbulbDuoTone />
                <span className="dark:text-gray-300 text-gray-900">
                  {understandingRate}
                </span>
              </h2>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="space-x-8 my-8">
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
          <div className="space-x-8 my-8">
            <button
              onClick={() => {
                setSortType("popular");
              }}
              className={cn(
                sortType === "popular" ? "dark:text-white" : " text-gray-500",
                "px-0 "
              )}
            >
              <Icons.fire className="text-xl md:text-2xl" />
            </button>
            <button
              onClick={() => {
                setSortType("timeline");
              }}
              className={cn(
                sortType === "timeline" ? "dark:text-white" : " text-gray-500",
                "px-0 "
              )}
            >
              <Icons.timeline className="text-xl md:text-2xl" />
            </button>
          </div>
        </div>

        {viewType === "character" && (
          <div className="my-8">
            <NmmListContainerAll>
              {uniqueCharactersMemo.map((char: any, idx: number) => {
                if (char.isLearned) {
                  return (
                    <HanziLink
                      frequency={char?.frequency}
                      character={char}
                      key={`${char?.hanzi}-chars-${idx}`}
                      lang={lang}
                    />
                  );
                } else {
                  return (
                    <HanziLink
                      lang={lang}
                      frequency={char?.frequency}
                      character={{
                        hanzi: char?.input,
                        // status: char?.status || "not_started",
                        hskLevel: 9,
                        pinyin: "",
                        en: "",
                      }}
                      // className={
                      //   isLearned
                      //     ? "text-gray-700 dark:text-gray-300"
                      //     : "text-gray-400 dark:text-gray-500"
                      // }
                      key={`${char?.input}-chars-${idx}`}
                    />
                  );
                }
              })}
            </NmmListContainerAll>
          </div>
        )}

        {viewType === "word" && (
          <div className="my-8">
            <NmmListContainerAll className="gap-4">
              {filteredHskWords?.map((char: any, idx: number) => {
                return (
                  <HanziLink
                    lang={lang}
                    frequency={char?.frequency}
                    character={char}
                    key={`${char?.hanzi}-chars-${idx}`}
                    // className={
                    //   isLearned
                    //     ? "text-gray-700 dark:text-gray-300"
                    //     : "text-gray-400 dark:text-gray-500"
                    // }
                  />
                );
              })}
            </NmmListContainerAll>
          </div>
        )}
      </div>
    </div>
  );
}
