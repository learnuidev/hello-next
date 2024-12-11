"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useSelectedCharacter } from "./use-selected-character";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { filterNonEnglishAlphabets } from "@/app/nmm/nmm-utils/filter-non-english-alphabets";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { useGetJournalDetailsQuery } from "../diary/hooks/use-get-journal-details-query";
import { useInsightsSettingsStore } from "./use-insights-settings-store";

const getFrequency = ({ lesson, input }: any) => {
  const translations = lesson?.translations?.filter((transcription: any) => {
    return (transcription?.hanzi || transcription?.input)?.includes(input);
  });

  return translations?.length;
};

export function useGetDiaryInsights({ entryId }: { entryId: string }) {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const sortType = useInsightsSettingsStore((state) => state.sortType);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: hskWords } = useListHSKWordsQuery();

  const router = useRouter();

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
  const uniqueCharacters =
    lang === "zh"
      ? [
          // @ts-ignore
          ...new Set(
            lesson?.translations
              // allLessonAnswers
              ?.map((answer: { hanzi: string }) => answer?.hanzi)
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
              lesson?.translations
                // allLessonAnswers
                ?.map((answer: { hanzi: string }) => answer?.hanzi)
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
              lesson?.translations
                // allLessonAnswers
                ?.map((answer: { hanzi: string }) => answer?.hanzi)
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
        const transcription =
          lesson?.translations.filter((transcription) => {
            return transcription?.hanzi?.includes(word?.hanzi);
          }) || [];

        return transcription?.length > 0;
      })
      ?.map((char: any, idx: number) => {
        const frequency = getFrequency({
          lesson,
          input: char?.hanzi || char?.input,
        });

        const transcription = lesson?.translations?.find((transcription: any) =>
          (transcription?.hanzi || transcription?.input)?.includes(
            char?.hanzi || char?.input
          )
        );

        const wordIndex =
          (lesson?.translations?.findIndex((transcription) =>
            transcription?.hanzi?.includes(char?.hanzi)
          ) || 0) * 10;

        const characterIndex = transcription?.hanzi?.indexOf(char?.hanzi);

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
