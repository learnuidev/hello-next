"use client";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useListAttempts = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const totalAttempts =
    learnedCharacters
      ?.map((item: any) => {
        return item?.reviewHistory?.reduce((acc: any, curr: any) => {
          return acc.concat({
            ...curr,
            hanzi: item?.hanzi,
            pinyin: item?.pinyin,
            en: item?.en,
            story: item?.story,
            status: item?.status,
            group: item?.group,
            totalAttempts: item?.reviewHistory?.length,
            totalIncorrect:
              item?.reviewHistory?.filter((v: any) => v.outcome === "incorrect")
                ?.length || 0,

            totalCorrect:
              item?.reviewHistory?.filter((v: any) => v.outcome === "correct")
                ?.length || 0,
          });
        }, []);
      })
      ?.flat()
      ?.filter(Boolean)
      ?.sort((a, b) => b?.createdAt - a?.createdAt) || [];

  return totalAttempts;
};
