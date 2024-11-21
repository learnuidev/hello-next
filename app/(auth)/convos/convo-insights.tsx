"use client";

import { useMemo, useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useRouter } from "next/navigation";

import { useSelectedCharacter } from "./use-selected-character";
import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { create } from "zustand";
import { HanziLink } from "@/components/hanzi-link";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { filterNonEnglishAlphabets } from "@/app/nmm/nmm-utils/filter-non-english-alphabets";
import { NmmListContainer } from "@/components/nmm-list-container";

export const useSearchQueryStore = create((set: any, get: any) => ({
  sortType: "timeline",
  setSortType: (f: any) =>
    typeof f === "function"
      ? set({ sortType: f(get().sortType) })
      : set({ sortType: f }),
  type: "character",
  setType: (f: any) =>
    typeof f === "function" ? set({ type: f(get().type) }) : set({ type: f }),
}));

const getFrequency = ({ lesson, input }: any) => {
  const transcriptions = lesson?.transcriptions?.filter(
    (transcription: any) => {
      return (transcription?.hanzi || transcription?.input)?.includes(input);
    }
  );

  return transcriptions?.length;
};

export function ConvoInsights({ lessonId }: { lessonId: string }) {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const viewType = useSearchQueryStore((state) => state.type);
  const setViewType = useSearchQueryStore((state) => state.setType);
  const setSortType = useSearchQueryStore((state) => state.setSortType);
  const sortType = useSearchQueryStore((state) => state.sortType);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueCharacters =
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
        ? [
            ...new Set(
              lesson?.transcriptions
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
                    ?.replaceAll("?", "")
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
            ),
          ]
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

  const totalNewCharaters = uniqueCharacters?.filter((char: any) => {
    const isLearned = learnedCharacters?.find(
      (item: any) => (item?.hanzi || item?.input) === char
    );

    return !!isLearned;
  })?.length;

  const uniqueCharactersMemo = useMemo(() => {
    const res = uniqueCharacters?.map((char: any, idx: number) => {
      const frequency = getFrequency({
        lesson,
        input: char?.hanzi || char?.input || char,
      });

      return {
        input: char,
        frequency: frequency,
      };
    });

    if (sortType === "popular") {
      return res?.sort(
        (first: any, second: any) => second?.frequency - first?.frequency
      );
    }
    return res;
  }, [lesson, uniqueCharacters, sortType]);

  const filteredHskWords = useMemo(() => {
    const res = hskWords
      ?.filter((word: any) => {
        const transcription = lesson?.transcriptions?.filter(
          (transcription: any) => {
            return (transcription?.hanzi || transcription?.input)?.includes(
              word?.hanzi
            );
          }
        );

        return transcription?.length > 0;
      })
      ?.map((char: any, idx: number) => {
        const frequency = getFrequency({
          lesson,
          input: char?.hanzi || char?.input,
        });

        const transcription = lesson?.transcriptions?.find(
          (transcription: any) =>
            (transcription?.hanzi || transcription?.input)?.includes(
              char?.hanzi || char?.input
            )
        );

        const wordIndex =
          lesson?.transcriptions?.findIndex((transcription: any) =>
            (transcription?.hanzi || transcription?.input)?.includes(
              char?.hanzi || char?.input
            )
          ) * 10;

        const characterIndex = (
          transcription?.hanzi || transcription?.input
        )?.indexOf(char?.hanzi || char?.input);

        return {
          ...char,
          wordIndex: (wordIndex || 0) + (characterIndex || 0),
          frequency: frequency,
        };
      });

    if (sortType === "popular") {
      return res?.sort(
        (first: any, second: any) => second?.frequency - first?.frequency
      );
    }
    return res?.sort(
      (first: any, second: any) => first?.wordIndex - second?.wordIndex
    );
  }, [hskWords, lesson, sortType]);

  const understandingRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(totalNewCharaters / uniqueCharacters?.length);

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
    <div className="w-full px-4 my-4 md:my-8">
      <div>
        <div>
          <div className="flex justify-between w-full">
            <div className="flex justify-start space-x-4 sm:space-x-16">
              <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                {uniqueCharacters?.length}{" "}
                <span className="text-sm md:text-xl">total chars </span>
              </h2>
              <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
                <span className="text-yellow-500">
                  {" "}
                  {uniqueCharacters?.length - totalNewCharaters}
                </span>
                <span className="text-sm md:text-xl">new chars </span>
              </h2>
            </div>

            <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
              <span className="text-gray-300"> {understandingRate}</span>
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
            <NmmListContainer>
              {uniqueCharactersMemo.map((char: any, idx: number) => {
                const isLearned = learnedCharacters?.find(
                  (item: any) => (item?.hanzi || item?.input) === char?.input
                );

                if (isLearned) {
                  return (
                    <HanziLink
                      frequency={char?.frequency}
                      character={isLearned}
                      key={`${isLearned?.hanzi}-chars-${idx}`}
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
            <NmmListContainer className="gap-4">
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
            </NmmListContainer>
          </div>
        )}
      </div>
    </div>
  );
}
