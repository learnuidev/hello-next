import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { countByDate } from "./count-by-date";
import { useGetFromAndToDate } from "./use-get-from-date";

export function useListWeeklyLearnedCharacters() {
  const { fromDate, toDate } = useGetFromAndToDate();

  const { data: learnedCharacters, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const { data } = countByDate({
    fromDate,
    toDate,
    list: learnedCharacters || [],
  });

  return {
    data,
    isLoading: isLearnedCharactersLoading,
  };
}
