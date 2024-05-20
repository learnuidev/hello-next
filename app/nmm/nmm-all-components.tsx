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

const useFilteredComponents = ({ query }: { query: string }) => {
  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: learnedCharacters2, isLoading: isLearnedCharactersLoading } =
    useListCharactersQuery();

  const filteredComponents = filterComponents(
    components,
    query,
    learnedCharacters2
  );

  return {
    data: filteredComponents,
    isLoading: isComponentsLoading || isLearnedCharactersLoading,
  };
};

export function NmmAllComponents() {
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

  const { data: learnedCharacters2 } = useListCharactersQuery();

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  const { data: components } = useListComponents({ includeAll: true });

  const slicedComponents = queryStr
    ? components
    : components?.slice(
        selectedBelt?.minCharacterLevel,
        selectedBelt?.maxCharacterLevel
      );

  const filteredComponents = filterComponents(
    slicedComponents,
    queryStr,
    learnedCharacters2
  );

  console.log("FILTETED STR", queryStr);

  return (
    <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
      {filteredComponents?.length > 0 &&
        filteredComponents.map((prop: any, idx: number) => {
          const selectedComp = components?.find(
            (component: any) => component?.hanzi === prop?.hanzi
          );

          const color = calculateColor({
            tone: selectedComp?.tone_level,
          });

          console.log("SELECTED COMP", selectedComp);

          return (
            <TooltipProvider key={`${prop.hanzi}-chars-${idx}`}>
              <Tooltip>
                <TooltipTrigger className="p-3 hover:scale-125 transition">
                  <Link
                    href={`/nmm/${prop.hanzi}?lang=zh`}
                    onClick={() => {
                      addHistoryMutation.mutate({
                        pathName: routeName,
                        hanzi: prop.hanzi,
                        lang: "zh",
                        contentId: prop.id,
                        eventType: "CONTENT_VIEWED",
                      } as any);
                    }}
                    className={`${
                      // learnedCharacters.includes(prop?.hanzi)
                      learnedCharacters2?.find(
                        (char: any) => char?.hanzi === prop?.hanzi
                      )
                        ? `${color}`
                        : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                          ? "text-yellow-500"
                          : selectedComp?.group
                            ? "text-slate-400"
                            : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
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
