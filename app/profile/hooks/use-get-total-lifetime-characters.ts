import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useGetTotalLifetimeCharacters = () => {
  const { data } = useListCharactersQuery();

  const totalLifetimeCharacters = data?.filter(
    (item) =>
      ((item?.hanzi || item?.input)?.length || 0) === 1 && item?.lang === "zh"
  )?.length;

  return totalLifetimeCharacters || 0;
};
