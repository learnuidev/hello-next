"use client";

import { useListUniqueCharatersByContentId } from "@/app/(auth)/convos/use-get-unique-characters-by-content-id";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { isBefore } from "date-fns";

export const getReviewCharacters = (learnedCharacters: any) =>
  learnedCharacters?.filter((character: any) => {
    if (character.status === "forgotten") {
      return false;
    }
    return character?.next_review_date
      ? isBefore(new Date(character?.next_review_date), new Date())
      : true;
  });

export const useListCharacterReviewList = (contentId?: string) => {
  const uniqueCharacters: string[] = useListUniqueCharatersByContentId({
    contentId: contentId || "",
  });

  const { data: learnedCharacters, ...rest } = useListCharactersQuery({
    hanzis: contentId ? uniqueCharacters || [] : undefined,
    contentId,
    from: "useListCharacterReviewList",
  });

  const reviewCharacters = getReviewCharacters(learnedCharacters);

  return {
    ...rest,
    data: reviewCharacters,
  };
};
