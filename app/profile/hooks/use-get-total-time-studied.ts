import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { secondsToTimestamp } from "../utils/seconds-to-timestamp";

export const calculateTotalTimeStudied = (items: any) => {
  return secondsToTimestamp(
    items
      ?.map((item: any) => {
        return (
          (item?.timeTaken || 0) +
          (item?.ponderTime || 0) +
          (item?.clozeTime || 0)
        );
      })
      .reduce((acc: any, curr: any) => acc + curr, 0) || 0
  );
};

export const useGetTotalTimeStudied = () => {
  const { data } = useListCharactersQuery();

  return calculateTotalTimeStudied(
    data?.map((item: any) => item?.reviewHistory).flat()
  );
};
