"use client";
import { useEffect } from "react";

import { useListComponents } from "@/domain/lesson/component.queries";

import { useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";
import { useGetSelectedBelt } from "./use-get-selected-belt";

export function AllComponents() {
  const selectedBelt = useGetSelectedBelt();
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";

  const setQuery = useSearchQueryStore((state) => state.setQuery);

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: chineseCharacters } = useListChineseCharactersQuery();

  const filteredComponents =
    (isComponentsLoading ? chineseCharacters : components)?.slice(
      0,
      selectedBelt?.maxCharacterLevel
    ) || [];

  return (
    <NmmListContainerAll>
      {filteredComponents
        ?.filter((comp: any) => comp?.hanzi?.length === 1)
        .map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
    </NmmListContainerAll>
  );
}
