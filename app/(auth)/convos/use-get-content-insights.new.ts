"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useGetContentQuery } from "@/domain/content/content.queries";
import {
  useListCharactersMapQuery,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";
import { useSelectedCharacter } from "./use-selected-character";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { filterNonEnglishAlphabets } from "@/app/nmm/nmm-utils/filter-non-english-alphabets";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { useInsightsSettingsStore } from "./use-insights-settings-store";
import { useQuery } from "@tanstack/react-query";

const getFrequency = ({ lesson, input }: any) => {
  const transcriptions = lesson?.transcriptions?.filter(
    (transcription: any) => {
      return (transcription?.hanzi || transcription?.input)?.includes(input);
    }
  );

  return transcriptions?.length;
};

export function useGetContentInsightsNew({ lessonId }: { lessonId: string }) {
  const sortType = useInsightsSettingsStore((state) => state.sortType);

  const { data: hskWords } = useListHSKWordsQuery();

  // const router = useRouter();

  const { data: lesson } = useGetContentQuery({ contentId: lessonId });

  const { data: learnedCharacters } = useListCharactersMapQuery();

  return useQuery({
    queryKey: [
      "get-content-insights",
      lessonId,
      JSON.stringify(lesson),
      JSON.stringify(learnedCharacters),
      sortType,
      JSON.stringify(hskWords),
    ],
    queryFn: async () => {
      const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;
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
        const isLearned = learnedCharacters?.[char];

        return !!isLearned;
      })?.length;

      const totalMasteryCharaters = uniqueCharacters?.filter((char: any) => {
        const isLearned = learnedCharacters?.[char];

        return isLearned?.status?.toLowerCase() === "forgotten";
      })?.length;

      const uniqueCharactersMemo = (() => {
        const res = uniqueCharacters?.map((char: any, idx: number) => {
          const frequency = getFrequency({
            lesson,
            input: char?.hanzi || char?.input || char,
          });

          const isLearned = learnedCharacters?.[char];

          return {
            input: char,
            ...isLearned,
            isLearned: !!isLearned ? true : false,
            frequency: frequency,
          };
        });

        if (sortType === "popular") {
          return res?.sort(
            (first: any, second: any) => second?.frequency - first?.frequency
          );
        }
        return res;
      })();

      const filteredHskWords = (() => {
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
      })();

      const understandingRate = Intl.NumberFormat("en-GB", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(totalNewCharaters / uniqueCharacters?.length);

      const masteryRate = Intl.NumberFormat("en-GB", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(totalMasteryCharaters / uniqueCharacters?.length);

      return {
        uniqueCharacters,
        understandingRate,
        totalNewCharaters,
        filteredHskWords,
        uniqueCharactersMemo,
        masteryRate,
      } as any;
    },
  });
}
