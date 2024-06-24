"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { belts, calculateColor, filterComponents } from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PreviewComponent } from "./preview-component";
import { useSearchQueryStore } from "@/components/search/state";
import { useQuery } from "@tanstack/react-query";
import { chineseCharacters } from "@/langs/chinese /characters";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

export function NmmCoreComponents() {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
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

  const { data: learnedCharacters2, isLoading } = useListCharactersQuery();

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({
      includeAll: true,
      singleItemsOnly: true,
    });
  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = isComponentsLoading ? chineseCharacters : componentsAll;

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

  const { data: authUser } = useCurrentAuthUser({});

  // const { data: filteredComponents } = useListComponentsByBelt();

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {filteredComponents?.length > 0 &&
        filteredComponents
          // ?.filter((comp: any) => comp?.level < 100)
          .map((prop: any, idx: number) => {
            const selectedComp = components?.find(
              (component: any) => component?.hanzi === prop?.hanzi
            );

            const color = calculateColor({
              tone: selectedComp?.tone_level,
            });

            const learnedChar = learnedCharacters2?.find(
              (char: any) => char?.hanzi === prop?.hanzi
            );

            if (learnedChar?.status === "forgotten") {
              return null;
            }

            return (
              <TooltipProvider key={`${prop.hanzi}-chars-${idx}`}>
                <Tooltip>
                  <TooltipTrigger className="p-2 md:p-3 hover:scale-125 transition">
                    <Link
                      href={`/nmm/${prop.hanzi}?lang=zh`}
                      onClick={() => {
                        if (authUser?.jwt) {
                          // addHistoryMutation.mutate({
                          //   pathName: routeName,
                          //   hanzi: prop.hanzi,
                          //   lang: "zh",
                          //   contentId: prop.id,
                          //   eventType: "CONTENT_VIEWED",
                          // } as any);
                        } else {
                          // alert("yoo");
                        }
                      }}
                      className={`${
                        // learnedCharacters.includes(prop?.hanzi)
                        isComponentsLoading
                          ? "text-gray-400"
                          : learnedChar
                            ? learnedChar?.status === "forgotten"
                              ? "text-yellow-500"
                              : `${color} text-gray-300`
                            : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                              ? "text-yellow-500"
                              : selectedComp?.group
                                ? "text-slate-700"
                                : "dark:text-gray-900"
                      } p-3 text-2xl md:text-2xl transition lowercase`}
                    >
                      {prop?.hanzi}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black border-gray-800">
                    <PreviewComponent component={prop} />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
    </div>
  );
}
