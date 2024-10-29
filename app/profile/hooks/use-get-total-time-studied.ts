import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { secondsToTimestamp } from "../utils/seconds-to-timestamp";

export const useGetTotalTimeStudied = () => {
  const { data } = useListCharactersQuery();

  const totalTimeStudied =
    data
      ?.map((item) => item?.reviewHistory)
      .flat()
      ?.map((item) => {
        return (item?.timeTaken || 0) + (item?.ponderTime || 0);
      })
      .reduce((acc, curr) => acc + curr, 0) || 0;

  return secondsToTimestamp(totalTimeStudied);
};
