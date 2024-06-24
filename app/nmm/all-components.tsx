"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chineseCharacters } from "@/langs/chinese /characters";

import { belts, calculateColor, filterComponents } from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { Icons } from "@/components/ui/icons.v2";

export function AllComponents() {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";
  const routeName = usePathname();
  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);
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

  const { data: learnedCharacters2 } = useListCharactersQuery();

  const { data: discoveredComponents } = useListComponents({
    discoverOnly: true,
    singleItemsOnly: true,
  });

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const comps = isComponentsLoading ? chineseCharacters : componentsAll;

  // const slicedComponents = queryStr
  //   ? comps
  //   : (isComponentsLoading ? chineseCharacters : components)?.slice(
  //       0,
  //       selectedBelt?.maxCharacterLevel
  //     );

  const slicedComponents = queryStr
    ? comps
    : (isComponentsLoading ? chineseCharacters : components)?.slice(
        selectedBelt?.minCharacterLevel,
        selectedBelt?.maxCharacterLevel
      );

  const filteredComponents = filterComponents(
    slicedComponents,
    queryStr,
    learnedCharacters2
  );

  //   const slicedComponents = queryStr
  //     ? components
  //     : components?.slice(0, selectedBelt?.maxCharacterLevel);

  //   const filteredComponents = filterComponents(
  //     slicedComponents,
  //     queryStr,
  //     learnedCharacters2
  //   );

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {filteredComponents
        ?.filter((comp: any) => comp?.level < 3501)
        .map((prop: any, idx: number) => {
          const selectedComp = components?.find(
            (component: any) => component?.hanzi === prop?.hanzi
          );

          const color = calculateColor({
            tone: selectedComp?.tone_level,
          });

          const learnedChar = learnedCharacters2?.find(
            (char: any) => char?.hanzi === prop?.hanzi
          ) as any;

          return (
            <div className="p-2 md:p-3" key={`${prop.hanzi}-chars-${idx}`}>
              <Link
                href={`/nmm/${prop.hanzi}?lang=zh`}
                onClick={() => {
                  // addHistoryMutation.mutate({
                  //   input: prop.input,
                  //   lang: "zh",
                  //   pathName: routeName,
                  //   contentId: prop.id,
                  //   eventType: "CONTENT_VIEWED",
                  // } as any);
                }}
                className={`${
                  // learnedCharacters.includes(prop?.hanzi)
                  isComponentsLoading
                    ? "text-gray-400"
                    : learnedChar
                      ? learnedChar?.status === "forgotten"
                        ? "text-gray-700"
                        : `${color} text-gray-300`
                      : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                        ? "text-yellow-500"
                        : selectedComp?.group
                          ? "text-slate-500"
                          : "dark:text-gray-900"
                } p-3 text-2xl md:text-2xl transition lowercase`}
              >
                {prop?.hanzi}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
