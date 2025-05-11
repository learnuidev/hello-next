import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useMemo } from "react";

export const useGetTotalLifetimeCharacters = () => {
  const { data } = useListCharactersQuery();

  const totalLifetimeCharacters = useMemo(
    () =>
      data?.filter(
        (item) =>
          ((item?.hanzi || item?.input)?.length || 0) === 1 &&
          item?.lang === "zh"
      )?.length || 0,
    [data]
  );

  return totalLifetimeCharacters;
};
