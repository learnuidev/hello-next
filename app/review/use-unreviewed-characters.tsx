"use client";

import {
  getReviewCharacters,
  useListCharacterReviewList,
} from "@/hooks/use-character-review-list";

import { useGetCharacterAnalytics } from "@/components/_select-character/use-get-character-analytics";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { isBefore } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetContentInsights } from "../(auth)/convos/use-get-content-insights";
import { useGetHskCharacters } from "../nmm/hsk/use-get-hsk-characters";
import { belts } from "../nmm/utils";
import { reviewCounterStore } from "./review-counter-store";
import { useGetReviewParams } from "./use-get-review-params";
import { useIsContent } from "./use-is-content";
import { useIsEntry } from "./use-is-entry";
import { useGetDiaryInsights } from "../(auth)/convos/use-get-diary-insights";
import { useMemo } from "react";

export function useUnreviwedCharacters() {
  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

  const searchParams = useSearchParams();
  const router = useRouter();

  const { mode, level, reviewMode, entryId } = useGetReviewParams();
  const { data: hskWords } = useListHSKWordsQuery();

  const { data: hskCharacters, isLoading: isHskCharactersLoading } =
    useGetHskCharacters({ getAll: true });

  const isContent = useIsContent(mode);
  const isEntry = useIsEntry(entryId);

  const char = searchParams?.get("char");
  const date = searchParams?.get("date") || "";
  const input = searchParams?.get("input") || "";
  const langParams = searchParams?.get("lang") || "";

  // const isSelected = date;

  const reviewCounts = reviewCounterStore((state: any) => state?.reviewCounts);

  const { uniqueCharactersMemo } = useGetContentInsights({ lessonId: mode });
  const { uniqueCharactersMemo: uniqueDiaryCharactersMemo } =
    useGetDiaryInsights({ entryId });

  const reviewCount = reviewCounts?.[date] || 0;

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const group = groups?.find((group) => group?.title === date);

  const groupItems = group?.items
    ?.filter(
      (character: any) => (character?.hanzi || character?.input)?.length <= 3
    )
    ?.sort((a: any, b: any) => {
      return (a?.reviewHistory?.length || 0) - (b?.reviewHistory?.length || 0);
    })
    ?.filter((item: any) => {
      if (langParams) {
        return item?.lang === langParams;
      }

      return true;
    });

  const {
    understandingRate,
    precisionRate,
    totalCharacters,
    totalNewCharaters,
    uniqueComponentWords,
    uniqueWords,
    masteryRate,
  } = useGetCharacterAnalytics({
    characterId: input,
    lang: "zh",
  });

  const hasReviewedAll = input
    ? uniqueComponentWords?.length <= reviewCount
    : date
      ? groupItems?.length <= reviewCount
      : false;

  const unReviewedCharacters = input
    ? hasReviewedAll
      ? getReviewCharacters(uniqueComponentWords)
      : uniqueComponentWords
    : date
      ? hasReviewedAll
        ? getReviewCharacters(groupItems)
        : groupItems
      : learnedCharacters?.filter(
          (character: any) => character?.hanzi?.length === 1
        );

  const contentData = useMemo(() => {
    if (!isContent) {
      return [];
    }

    const data = uniqueCharactersMemo
      ?.filter((item: any) => {
        return item?.isLearned && item?.status !== "forgotten";
      })

      ?.filter((character: any) => {
        if (reviewMode === "all") {
          return true;
        }
        return character?.next_review_date
          ? isBefore(new Date(character?.next_review_date), new Date())
          : true;
      });

    return reviewMode === "all"
      ? data
      : data?.sort(
          (a: any, b: any) =>
            (a.next_review_date || 0) - (b?.next_review_date || 0)
        );
  }, [isContent, reviewMode, uniqueCharactersMemo]);

  if (["hsk", "hsk3"]?.includes(mode)) {
    const data = (
      reviewMode === "all"
        ? hskCharacters?.filter((item: any) => {
            return item?.journeyId;
          })
        : hskCharacters?.filter((item: any) => {
            const unreviewedCharacter = unReviewedCharacters?.find(
              (char: any) => char?.hanzi === item?.hanzi
            );

            return unreviewedCharacter && item?.hskLevel == level;
          })
    )?.sort(
      (a: any, b: any) => (a.next_review_date || 0) - (b?.next_review_date || 0)
    );

    return {
      data: data,
      isLoading: isLearnedCharactersLoading || isHskCharactersLoading,
    };
  }

  if (isContent) {
    return {
      data: contentData,
      isLoading: isLearnedCharactersLoading || isHskCharactersLoading,
    };
  }

  if (isEntry) {
    const data = uniqueDiaryCharactersMemo
      ?.filter((item: any) => {
        const hskCharacter = hskWords?.find((word: any) =>
          JSON.stringify(word)?.includes(item?.hanzi)
        );

        return (
          item?.isLearned && item?.status !== "forgotten"
          // && hskCharacter?.hskLevel === level
        );
      })

      ?.filter((character: any) => {
        if (reviewMode === "all") {
          return true;
        }
        return character?.next_review_date
          ? isBefore(new Date(character?.next_review_date), new Date())
          : true;
      });

    return {
      data:
        reviewMode === "all"
          ? data
          : data?.sort(
              (a: any, b: any) =>
                (a.next_review_date || 0) - (b?.next_review_date || 0)
            ),
      isLoading: isLearnedCharactersLoading || isHskCharactersLoading,
    };
  }

  return {
    data: unReviewedCharacters
      ?.sort(
        (a: any, b: any) =>
          (a.next_review_date || 0) - (b?.next_review_date || 0)
      )
      ?.sort((a: any, b: any) => {
        return (
          (b?.reviewHistory?.length || 0) - (a?.reviewHistory?.length || 0)
        );
      }),
    isLoading: isLearnedCharactersLoading || isHskCharactersLoading,
  };
}
