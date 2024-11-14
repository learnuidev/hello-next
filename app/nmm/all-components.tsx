"use client";
import { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { chineseCharacters } from "@/langs/chinese /characters";

import { useListComponents } from "@/domain/lesson/component.queries";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { useGetSelectedBelt } from "./use-get-selected-belt";

export function AllComponents() {
  const selectedBelt = useGetSelectedBelt();
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";
  const routeName = usePathname();

  const queryStr = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  const addHistoryMutation = useAddHistoryMutation();

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const lastAnswer = answers?.[answers?.length - 1];

  // const { data: learnedCharacters2 } = useListCharactersQuery();

  // const { data: discoveredComponents } = useListComponents({
  //   discoverOnly: true,
  //   singleItemsOnly: true,
  // });

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  // const { data: componentsAll } = useListComponents({
  //   includeAll: true,
  // });

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  // const comps = isComponentsLoading ? chineseCharacters : componentsAll;

  // const slicedComponents = queryStr
  //   ? comps
  //   : (isComponentsLoading ? chineseCharacters : components)?.slice(
  //       selectedBelt?.minCharacterLevel,
  //       selectedBelt?.maxCharacterLevel
  //     );

  // const filteredComponents = filterComponents({
  //   components: slicedComponents,
  //   query: queryStr,
  //   characters: learnedCharacters2,
  // });
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
