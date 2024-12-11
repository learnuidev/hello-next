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
import { useInsightsSettingsStore } from "./use-insights-settings-store";

const getFrequency = ({ lesson, input }: any) => {
  const transcriptions = lesson?.transcriptions?.filter(
    (transcription: any) => {
      return (transcription?.hanzi || transcription?.input)?.includes(input);
    }
  );

  return transcriptions?.length;
};

export function useGetContentInsights({ lessonId }: { lessonId: string }) {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const sortType = useInsightsSettingsStore((state) => state.sortType);

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

      const isLearned = learnedCharacters?.find(
        (item: any) => (item?.hanzi || item?.input) === char
      );

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
  }, [uniqueCharacters, sortType, lesson, learnedCharacters]);

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

  return {
    uniqueCharacters,
    understandingRate,
    totalNewCharaters,
    filteredHskWords,
    uniqueCharactersMemo,
  };
}
