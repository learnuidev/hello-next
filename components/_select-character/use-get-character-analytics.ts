"use client";

import { useListCharactersMapQuery } from "@/domain/lesson/character.queries";

import { filterNonEnglishAlphabets } from "@/app/nmm/nmm-utils/filter-non-english-alphabets";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { useMemo } from "react";

export function useGetCharacterAnalytics({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) {
  const uniqueCharacters = useMemo(
    () =>
      lang === "zh"
        ? [
            ...new Set(
              characterId
                ?.split("")
                .join("")
                ?.toLocaleLowerCase()
                ?.split("")
                ?.filter(filterNonHanYu)
            ),
          ]
        : [
            ...new Set(
              [...characterId?.split("")].map(filterNonEnglishAlphabets)
            ),
          ],
    [characterId, lang]
  );

  const { data: learnedCharacters } = useListCharactersMapQuery({
    from: "use-get-character-analytics",
    hanzis: uniqueCharacters,
  });

  const totalLearnedCharaters = useMemo(
    () =>
      uniqueCharacters?.filter((char) => {
        const isLearned = learnedCharacters?.[char];

        return !!isLearned;
      })?.length,
    [learnedCharacters, uniqueCharacters]
  );

  const newCharaters = useMemo(
    () =>
      uniqueCharacters?.filter((char) => {
        const isLearned = learnedCharacters?.[char];

        return !isLearned;
      }),
    [learnedCharacters, uniqueCharacters]
  );

  const totalLearnedCharacters = useMemo(
    () =>
      uniqueCharacters
        ?.map((char) => {
          const isLearned = learnedCharacters?.[char];

          return isLearned;
        })
        ?.filter(Boolean),
    [learnedCharacters, uniqueCharacters]
  );

  const totalMasteredCharacters = useMemo(
    () =>
      totalLearnedCharacters?.filter(
        (item: any) => item?.status === "forgotten"
      ),
    [totalLearnedCharacters]
  );

  const understandingRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(totalLearnedCharaters / uniqueCharacters?.length);

  const masteryRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(totalMasteredCharacters?.length / uniqueCharacters?.length);

  const totalReviewedCharacters = totalLearnedCharacters?.filter(
    (character: any) => character?.reviewHistory?.length > 0
  );

  const averagePrecisionRate = useMemo(
    () =>
      totalReviewedCharacters
        ?.map((char) => {
          const totalReviews = char?.reviewHistory?.length || 1;
          const totalIncorrectReviews =
            char?.reviewHistory?.filter(
              (reviewItem: any) => reviewItem?.outcome === "incorrect"
            )?.length || 0;

          return totalIncorrectReviews / totalReviews;
        })
        .reduce((acc, curr) => acc + curr, 0) /
      (totalReviewedCharacters?.length || 1),
    [totalReviewedCharacters]
  );

  const precisionRate = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(averagePrecisionRate);

  const uniqueComponentWords = useMemo(
    () =>
      uniqueCharacters
        ?.map((word) => {
          const comp = learnedCharacters?.[word];

          if (!comp) {
            return null;
          }

          return comp;
        })
        ?.filter(Boolean)
        // @ts-ignore
        ?.sort((a, b) => b?.next_review_date - a?.next_review_date),
    [learnedCharacters, uniqueCharacters]
  );

  return {
    uniqueWords: uniqueCharacters,
    uniqueCharacters,
    uniqueComponentWords,
    understandingRate,
    masteryRate,
    precisionRate,
    totalCharacters: uniqueCharacters?.length,
    newCharaters,
    totalNewCharaters: uniqueCharacters?.length - totalLearnedCharaters,
  };
}
