"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useRouter } from "next/navigation";

import { useSelectedCharacter } from "./use-selected-character";
import { SelectedCharacter } from "@/components/selected-character";
import { useListParseQuery } from "@/domain/nmm/nmm.queries";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";
import { filterNonEnglishAlphabets, filterNonHanYu } from "@/app/nmm/utils";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { HanziLink } from "@/components/hanzi-link";

// const [query, setQuery] = useState('')
// const [index, setIndex] = useState(0)
// const [queryResult, setQueryResult] = useState<any>(null)

export const useSearchQueryStore = create((set: any, get: any) => ({
  type: "character",
  setType: (f: any) =>
    typeof f === "function" ? set({ type: f(get().type) }) : set({ type: f }),
}));

export function ConvoInsights({ lessonId }: { lessonId: string }) {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const viewType = useSearchQueryStore((state) => state.type);
  const setViewType = useSearchQueryStore((state) => state.setType);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: hskWords } = useListHSKWordsQuery();

  const router = useRouter();

  const { data: lesson } = useGetContentQuery({ contentId: lessonId });

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

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

  const filteredHskWords = hskWords?.filter((word: any) => {
    const transcription = lesson?.transcriptions?.filter(
      (transcription: any) => {
        return (transcription?.hanzi || transcription?.input)?.includes(
          word?.hanzi
        );
      }
    );

    return transcription?.length > 0;
  });

  const uniqueWords =
    lang === "zh"
      ? [
          // @ts-ignore
          ...new Set(
            lesson?.transcriptions
              // allLessonAnswers
              ?.map(
                (answer: { hanzi: string; input: string }) =>
                  answer?.hanzi || answer?.input
              )
              ?.join("")
          ),
        ]
          .join("")
          ?.toLocaleLowerCase()
          ?.split("")
          ?.filter(filterNonHanYu)
      : lang === "en"
        ? lesson?.transcriptions
            // allLessonAnswers
            ?.map(
              (answer: { hanzi: string; input: string }) =>
                answer?.hanzi || answer?.input?.split(" ")
            )
            ?.flat()
            ?.map((word: string) => {
              let newWord = word
                ?.replaceAll(", ", "")
                ?.replaceAll(":", "")
                ?.replaceAll("-", "")
                ?.replaceAll(",", "");

              const indexOfSingleQuote = newWord?.indexOf("'");

              console.log("indexOfSingleQuote", indexOfSingleQuote);

              if (
                indexOfSingleQuote === 0 ||
                indexOfSingleQuote + 1 === newWord?.length
              ) {
                newWord = newWord?.replaceAll("'", "");
              }

              return newWord;
            })
            ?.filter(Boolean)
        : [
            ...new Set(
              lesson?.transcriptions
                // allLessonAnswers
                ?.map(
                  (answer: { hanzi: string; input: string }) =>
                    answer?.hanzi || answer?.input?.split(" ")
                )
                ?.flat()
                .map(filterNonEnglishAlphabets)
            ),
          ];

  const totalNewCharaters = uniqueWords?.filter((char: any) => {
    const isLearned = learnedCharacters?.find(
      (item: any) => (item?.hanzi || item?.input) === char
    );

    return !!isLearned;
  })?.length;

  const understandingRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(totalNewCharaters / uniqueWords?.length);

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
    <SelectedCharacter characterId={selectedChar} />
  ) : (
    <div className="w-full px-4 my-4 md:my-8">
      <div>
        <div>
          <div className="flex justify-between w-full">
            <div className="flex justify-start space-x-4 sm:space-x-16">
              <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                {uniqueWords?.length}{" "}
                <span className="text-sm md:text-xl">total chars </span>
              </h2>
              <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
                <span className="text-yellow-500">
                  {" "}
                  {uniqueWords?.length - totalNewCharaters}
                </span>
                <span className="text-sm md:text-xl">new chars </span>
              </h2>
            </div>

            <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
              <span className="text-gray-300"> {understandingRate}</span>
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
            <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
              {uniqueWords?.map((char: any, idx: number) => {
                const isLearned = learnedCharacters?.find(
                  (item: any) => (item?.hanzi || item?.input) === char
                );

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
                        hskLevel: 9,
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
            </div>
          </div>
        )}

        {viewType === "word" && (
          <div className="my-8">
            <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
              {filteredHskWords?.map((char: any, idx: number) => {
                const isLearned = learnedCharacters?.find(
                  (item: any) => (item?.hanzi || item?.input) === char
                );

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
