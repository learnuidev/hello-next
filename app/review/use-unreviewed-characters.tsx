"use client";

import {
  getReviewCharacters,
  useListCharacterReviewList,
} from "@/hooks/use-character-review-list";

import { useRouter, useSearchParams } from "next/navigation";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { reviewCounterStore } from "./review-counter-store";

export function useUnreviwedCharacters() {
  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

  const searchParams = useSearchParams();
  const router = useRouter();

  const char = searchParams?.get("char");
  const date = searchParams?.get("date") || "";
  const langParams = searchParams?.get("lang") || "";

  const isSelected = date;

  const reviewCounts = reviewCounterStore((state: any) => state?.reviewCounts);

  const reviewCount = reviewCounts?.[date] || 0;

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const group = groups?.find((group) => group?.title === date);

  const groupItems = group?.items
    // ?.filter((character: any) => character?.hanzi?.length === 1)
    ?.sort((a: any, b: any) => {
      return (a?.reviewHistory?.length || 0) - (b?.reviewHistory?.length || 0);
    })
    ?.filter((item: any) => {
      if (langParams) {
        return item?.lang === langParams;
      }

      return true;
    });

  const hasReviewedAll = date ? groupItems?.length <= reviewCount : false;

  const unReviewedCharacters = isSelected
    ? hasReviewedAll
      ? getReviewCharacters(groupItems)
      : groupItems
    : learnedCharacters?.filter(
        (character: any) => character?.hanzi?.length === 1
      );

  return unReviewedCharacters;
}
