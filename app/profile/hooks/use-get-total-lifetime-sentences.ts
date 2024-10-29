import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useGetTotalLifetimeSentences = () => {
  const { data } = useListCharactersQuery();

  const totalLifetimeSentences = data?.filter(
    (item) =>
      ((item?.hanzi || item?.input)?.length || 0) > 3 && item?.lang === "zh"
  )?.length;

  return totalLifetimeSentences || 0;
};
