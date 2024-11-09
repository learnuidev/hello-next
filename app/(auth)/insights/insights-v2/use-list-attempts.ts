"use client";

import { useSearchQueryStore } from "@/components/search/state";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { IComponent } from "@/domain/lesson/component.queries";

type InsightItem = IComponent & {
  story: string;
  status: string;
  group: string;
  totalAttempts: number;
  totalIncorrect: number;
  totalCorrect: number;
};

export const useListAttempts = (): InsightItem[] => {
  const { data: learnedCharacters } = useListCharactersQuery();
  const querySync = useSearchQueryStore((state) => state.query);

  const totalAttempts =
    learnedCharacters
      ?.map((item: any) => {
        if (!item?.reviewHistory?.length && item?.hanzi?.length === 1) {
          return [
            {
              ...item,
              totalAttempts: 0,
              totalIncorrect: 0,
              totalCorrect: 0,
            },
          ];
        }
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
