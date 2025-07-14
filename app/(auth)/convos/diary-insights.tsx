"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useSelectedCharacter } from "./use-selected-character";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { HanziLink } from "@/components/hanzi-link";

import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { useGetJournalDetailsQuery } from "../diary/hooks/use-get-journal-details-query";
import { useGetDiaryInsights } from "./use-get-diary-insights";
import { useInsightsSettingsStore } from "./use-insights-settings-store";

const getFrequency = ({ lesson, input }: any) => {
  const transcriptions = lesson?.transcriptions?.filter(
    (transcription: any) => {
      return (transcription?.hanzi || transcription?.input)?.includes(input);
    }
  );

  return transcriptions?.length;
};

export function DiaryInsights({ entryId }: { entryId: string }) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const sortType = useInsightsSettingsStore((state) => state.sortType);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: lesson } = useGetJournalDetailsQuery(entryId);

  const lang = "zh";

  const { data: learnedCharacters } = useListCharactersQuery();

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const {
    understandingRate,
    filteredHskWords,
    uniqueCharactersMemo,
    totalNewCharaters,
    uniqueCharacters,
  } = useGetDiaryInsights({ entryId });

  if (isLoading) {
    return (
      <div className=" px-4 md:px-32 my-4 md:my-8">
        <div className="text-center my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
          ...
        </div>
      </div>
    );
  }

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="w-full my-4 md:my-8">
      <div>
        <div>
          <div className="flex justify-between w-full">
            <div className="flex justify-start space-x-4 sm:space-x-16">
              <h2 className="text-xl flex flex-col items-center my-4 font-extralight text-gray-500 dark:text-gray-300">
                <span> {uniqueCharacters?.length}</span>
                <span className="text-sm text-gray-400 uppercase">
                  {" "}
                  total chars{" "}
                </span>
              </h2>
              <h2 className="text-xl flex flex-col items-center my-4 font-extralight text-gray-500 dark:text-gray-300">
                <span className="text-yellow-500">
                  {uniqueCharacters?.length - totalNewCharaters}
                </span>
                <span className="text-sm text-gray-400 uppercase">
                  new chars{" "}
                </span>
              </h2>
            </div>

            <h2 className="text-xl flex flex-col items-center my-4 font-extralight text-gray-500 dark:text-gray-300">
              <span className="text-gray-300"> {understandingRate}</span>
              <span className="text-sm text-gray-400 uppercase">learned</span>
            </h2>
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
                        hskLevel: 9,
                        // status: char?.status || "not_started",
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
