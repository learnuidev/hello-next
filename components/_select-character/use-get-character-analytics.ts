"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { filterNonEnglishAlphabets } from "@/app/nmm/nmm-utils/filter-non-english-alphabets";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";

export function useGetCharacterAnalytics({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) {
  const { data: hskWords } = useListHSKWordsQuery();

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

  const uniqueWords =
    lang === "zh"
      ? characterId
          ?.split("")
          .join("")
          ?.toLocaleLowerCase()
          ?.split("")
          ?.filter(filterNonHanYu)
      : [
          ...new Set(
            [...characterId?.split("")].map(filterNonEnglishAlphabets)
          ),
        ];

  const totalNewCharaters = uniqueWords?.filter((char) => {
    const isLearned = learnedCharacters?.find(
      (item: any) => (item?.hanzi || item?.input) === char
    );

    return !!isLearned;
  })?.length;

  const totalLearnedCharacters = uniqueWords
    ?.map((char) => {
      const isLearned = learnedCharacters?.find(
        (item: any) => item?.hanzi === char
      );

      return isLearned;
    })
    ?.filter(Boolean);

  const totalMasteredCharacters = totalLearnedCharacters?.filter(
    (item: any) => item?.status === "forgotten"
  );

  if (characterId === "各地的气候都不一样。") {
    console.log("TOTAL MASTERED", totalMasteredCharacters);
  }

  const understandingRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(totalNewCharaters / uniqueWords?.length);

  const masteryRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(totalMasteredCharacters?.length / uniqueWords?.length);

  const totalReviewedCharacters = totalLearnedCharacters?.filter(
    (character: any) => character?.reviewHistory?.length > 0
  );

  const averagePrecisionRate =
    totalReviewedCharacters
      ?.map((char) => {
        const totalReviews = char?.reviewHistory?.length || 1;
        const totalIncorrectReviews =
          char?.reviewHistory?.filter(
            (reviewItem) => reviewItem?.outcome === "incorrect"
          )?.length || 0;

        return totalIncorrectReviews / totalReviews;
      })
      .reduce((acc, curr) => acc + curr, 0) /
    (totalReviewedCharacters?.length || 1);

  const precisionRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(averagePrecisionRate);

  const uniqueComponentWords = uniqueWords
    ?.map((word) => {
      const comp = learnedCharacters?.find(
        (item: any) => (item?.hanzi || item?.input) === word
      );

      if (!comp) {
        return null;
      }

      return comp;
    })
    ?.filter(Boolean);

  return {
    uniqueWords,
    uniqueComponentWords,
    understandingRate,
    masteryRate,
    precisionRate,
    totalCharacters: uniqueWords?.length,
    totalNewCharaters: uniqueWords?.length - totalNewCharaters,
  };
}
