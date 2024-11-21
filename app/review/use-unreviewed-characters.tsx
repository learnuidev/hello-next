"use client";

import {
  getReviewCharacters,
  useListCharacterReviewList,
} from "@/hooks/use-character-review-list";

import { useRouter, useSearchParams } from "next/navigation";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { reviewCounterStore } from "./review-counter-store";
import { useGetHskCharacters } from "../nmm/hsk/use-get-hsk-characters";
import { useGetReviewParams } from "./use-get-review-params";
import { useGetCharacterAnalytics } from "@/components/_select-character/use-get-character-analytics";
import { useListComponents } from "@/domain/lesson/component.queries";

export function useUnreviwedCharacters() {
  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

  const searchParams = useSearchParams();
  const router = useRouter();

  const { mode, level, reviewMode } = useGetReviewParams();

  const { data: hskCharacters, isLoading: isHskCharactersLoading } =
    useGetHskCharacters({ getAll: true });

  const char = searchParams?.get("char");
  const date = searchParams?.get("date") || "";
  const input = searchParams?.get("input") || "";
  const langParams = searchParams?.get("lang") || "";

  // const isSelected = date;

  const reviewCounts = reviewCounterStore((state: any) => state?.reviewCounts);

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

  // console.log("GROUP ITEMS", groupItems);

  // console.log("TOTAL WORDS", uniqueWords);

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

  // console.log("UN REVIEWED CHARS", unReviewedCharacters);

  if (["hsk", "hsk3"]?.includes(mode)) {
    const data = (
      reviewMode === "all"
        ? hskCharacters
        : hskCharacters?.filter((item: any) => {
            const unreviewedCharacter = unReviewedCharacters?.find(
              (char: any) => char?.hanzi === item?.hanzi
            );

            return unreviewedCharacter && item?.hskLevel == level;
          })
    )?.sort(
      (a: any, b: any) => (a.next_review_date || 0) - (b?.next_review_date || 0)
    );

    console.log("HSK", hskCharacters);

    console.log("DATA", data);

    return {
      data,
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
