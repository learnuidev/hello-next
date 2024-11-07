"use client";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useListErrors = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const totalErrors =
    learnedCharacters
      ?.map((item: any) => {
        return item?.reviewHistory?.reduce((acc: any, curr: any) => {
          if (curr?.outcome === "incorrect") {
            return acc.concat({
              ...curr,
              hanzi: item?.hanzi,
              pinyin: item?.pinyin,
              en: item?.en,
              story: item?.story,
            });
          }

          return acc;
        }, []);
      })
      ?.flat()
      ?.filter(Boolean)
      ?.sort((a, b) => b?.createdAt - a?.createdAt) || [];

  return totalErrors;
};
