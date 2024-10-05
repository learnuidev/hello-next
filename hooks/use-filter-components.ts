"use client";

import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { chineseCharacters } from "@/langs/chinese /characters";
import { filterComponents } from "@/app/nmm/nmm-utils/filter-components";
import { getHumanPinyin } from "@/app/nmm/nmm-utils/get-human-pinyin";

export const useFilteredComponents = (
  { query }: { query: string },
  { exact, isQuerySameAsVal }: { exact: boolean; isQuerySameAsVal?: boolean }
) => {
  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: learnedCharacters2, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const humanizedQuery = getHumanPinyin({ pinyin: query });

  const filteredComponents = filterComponents(
    components || chineseCharacters,
    humanizedQuery,
    learnedCharacters2,
    isQuerySameAsVal
  );

  if (!query) {
    return {
      data: [],
    };
  }

  return {
    data: filteredComponents?.filter((item: any) => {
      if (exact) {
        return item?.score === 1;
      }
      return true;
    }),
    isLoading: isComponentsLoading || isLearnedCharactersLoading,
  } as any;
};

export const filterComponentsExact = (components: any, query: any) => {
  const humanizedQuery = getHumanPinyin({ pinyin: query });

  const filteredComponents = filterComponents(components, humanizedQuery, []);

  return filteredComponents?.filter((item: any) => {
    return item?.score === 1;
  });
};
