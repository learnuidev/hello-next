"use client";

import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { filterComponents } from "@/app/nmm/nmm-utils/filter-components";
import { getHumanPinyin } from "@/app/nmm/nmm-utils/get-human-pinyin";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";

export const useFilteredComponents = (
  { query }: { query: string },
  { exact, isQuerySameAsVal }: { exact: boolean; isQuerySameAsVal?: boolean }
) => {
  const { data: chineseCharacters } = useListChineseCharactersQuery();
  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: learnedCharacters2, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const humanizedQuery = getHumanPinyin({ pinyin: query });

  const filteredComponents = filterComponents({
    components: components || chineseCharacters,
    query: humanizedQuery,
    characters: learnedCharacters2,
    isQuerySameAsVal,
  });

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

const filterComponentsExact = (components: any, query: any) => {
  const humanizedQuery = getHumanPinyin({ pinyin: query });

  const filteredComponents = filterComponents({
    components,
    query: humanizedQuery,
    characters: [],
  });

  return filteredComponents?.filter((item: any) => {
    return item?.score === 1;
  });
};
