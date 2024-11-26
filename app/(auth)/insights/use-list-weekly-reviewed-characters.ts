import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { countByDate } from "./count-by-date";

import { useGetFromAndToDate } from "./use-get-from-date";

export function useListWeeklyReviewedCharacters() {
  const { fromDate, toDate } = useGetFromAndToDate();

  const { data: learnedCharacters, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const { data } = countByDate({
    fromDate,
    toDate,
    list: (learnedCharacters || [])
      ?.map((character) => character?.reviewHistory)
      ?.flat(),
  });

  return {
    data,
    isLoading: isLearnedCharactersLoading,
  };
}
