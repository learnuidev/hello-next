"use client";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { isBefore } from "date-fns";

export const getReviewCharacters = (learnedCharacters: any) =>
  learnedCharacters?.filter((character: any) =>
    character?.next_review_date
      ? isBefore(new Date(character?.next_review_date), new Date())
      : true
  );

export const useListCharacterReviewList = () => {
  const { data: learnedCharacters, ...rest } = useListCharactersQuery();

  const reviewCharacters = getReviewCharacters(learnedCharacters);

  return {
    ...rest,
    data: reviewCharacters,
  };
};
