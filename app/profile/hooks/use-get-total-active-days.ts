import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useGetTotalActiveDays = () => {
  const { data } = useListCharactersQuery();

  console.log("DATA", data);

  const totalActiveDays =
    data?.filter(
      (item) =>
        ((item?.hanzi || item?.input)?.length || 0) > 3 && item?.lang === "zh"
    )?.length || 0;

  return totalActiveDays < 1
    ? `${totalActiveDays} day`
    : `${totalActiveDays} days`;
};
