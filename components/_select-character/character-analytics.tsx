"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useSelectedCharacter } from "../../app/(auth)/convos/use-selected-character";

import {
  useListCharactersMapQuery,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";
import Link from "next/link";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { HanziLink } from "@/components/hanzi-link";
import { create } from "zustand";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";
import { NmmListContainer } from "../nmm-list-container";
import { useInsightsSettingsStore } from "@/app/(auth)/convos/use-insights-settings-store";
import { useMemo } from "react";

export function CharacterAnalytics({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: hskWords } = useListHSKWordsQuery();

  const { data: learnedCharacters } = useListCharactersMapQuery();

  const filteredHskWords = useMemo(
    () =>
      hskWords
        ?.filter((word: any) => {
          return characterId?.includes(word?.hanzi);
        })
        .map((item: any) => {
          const wordIndex = characterId?.indexOf(item?.hanzi || item?.input);

          return {
            ...item,
            wordIndex: wordIndex || 0,
          };
        })
        ?.sort(
          (first: any, second: any) => first?.wordIndex - second?.wordIndex
        ),
    [characterId, hskWords]
  );

  const {
    understandingRate,
    precisionRate,
    totalCharacters,
    totalNewCharaters,
    uniqueWords,
    masteryRate,
  } = useGetCharacterAnalytics({
    characterId,
    lang,
  });

  // if (isLoading) {
  //   return (
  //     <div className=" px-4 md:px-32 my-4 md:my-8">
  //       <div className="text-center my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
  //         ...
  //       </div>
  //     </div>
  //   );
  // }

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="w-full px-4 my-4 md:my-8">
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
                <Icons.bullsEyeArrowDT />
              </span>
              <span className="text-gray-300"> {precisionRate}</span>
            </h2>

            <h2 className="text-lg sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
              <span>
                <Icons.fireDuoTone />
              </span>
              <span className="text-gray-300"> {masteryRate}</span>
            </h2>
          </div>
        </div>

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
          {/* <button
            onClick={() => {
              setViewType("sentence");
            }}
            className={cn(
              viewType === "sentence" ? "dark:text-white" : "text-gray-500",
              "px-0 "
            )}
          >
            <Icons.trees className="text-xl md:text-2xl" />
          </button> */}
        </div>

        {viewType === "character" && (
          <div className="my-8">
            <NmmListContainer className="md:mx-0">
              {uniqueWords?.map((char: any, idx: number) => {
                if (!char) {
                  return null;
                }
                const isLearned = learnedCharacters?.[char];

                if (isLearned) {
                  return (
                    <HanziLink
                      character={isLearned}
                      key={`${isLearned?.hanzi}-chars-${idx}`}
                    />
                  );
                } else {
                  return (
                    <HanziLink
                      character={{
                        hanzi: char,
                        pinyin: "",
                        en: "",
                      }}
                      // className={
                      //   isLearned
                      //     ? "text-gray-700 dark:text-gray-300"
                      //     : "text-gray-400 dark:text-gray-500"
                      // }
                      key={`${char}-chars-${idx}`}
                    />
                  );
                }

                return (
                  <Link
                    href={`/nmm/${char}${lang ? `?lang=${lang}` : ""}`}
                    // onClick={() => {
                    //   setSelectedChar(char);
                    // }}
                    className={`p-2 ${
                      // ""
                      isLearned
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    // className="p-2"
                    key={`${idx}-${char}-${idx}`}
                  >
                    {" "}
                    {char}
                  </Link>
                );
              })}
            </NmmListContainer>
          </div>
        )}

        {viewType === "word" && (
          <div className="my-8">
            <NmmListContainer className="md:mx-0">
              {filteredHskWords?.map((char: any, idx: number) => {
                const isLearned = learnedCharacters?.[char];

                return (
                  <HanziLink
                    character={char}
                    key={`${char?.hanzi}-chars-${idx}`}
                    // className={
                    //   isLearned
                    //     ? "text-gray-700 dark:text-gray-300"
                    //     : "text-gray-400 dark:text-gray-500"
                    // }
                  />
                );
                return (
                  <Link
                    href={`/nmm/${char}${lang ? `?lang=${lang}` : ""}`}
                    // onClick={() => {
                    //   setSelectedChar(char);
                    // }}
                    className={`p-2 ${
                      // ""
                      isLearned
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    // className="p-2"
                    key={`${idx}-${char?.hanzi}-${idx}`}
                  >
                    {" "}
                    {char?.hanzi}
                  </Link>
                );
              })}
            </NmmListContainer>
          </div>
        )}
      </div>
    </div>
  );
}
