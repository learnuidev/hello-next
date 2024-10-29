import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";

export const useGetTotalActiveDays = () => {
  const { data: groups } = useListLearnedCharactersByDate({ variant: "all" });

  const totalActiveDays = groups?.length || 0;

  return totalActiveDays <= 1
    ? `${totalActiveDays} day`
    : `${totalActiveDays} days`;
};
