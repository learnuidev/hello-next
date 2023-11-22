"use client";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { isBefore } from "date-fns";

export const useListCharacterReviewList = () => {
  const { data: learnedCharacters, ...rest } = useListCharactersQuery();

  const reviewCharacters = learnedCharacters?.filter((character: any) =>
    character?.next_review_date
      ? isBefore(new Date(character?.next_review_date), new Date())
      : true
  );

  return {
    ...rest,
    data: reviewCharacters,
  };
};
