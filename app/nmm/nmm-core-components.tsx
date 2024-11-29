"use client";
import { useEffect, useState } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainer } from "@/components/nmm-list-container";
import { useSearchQueryStore } from "@/components/search/state";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { chineseCharacters } from "@/langs/chinese /characters";
import { usePathname, useSearchParams } from "next/navigation";
import { filterComponents } from "./nmm-utils/filter-components";
import { Nothing } from "./nothing";
import { PreviewComponent } from "./preview-component";
import { useGetSelectedBelt } from "./use-get-selected-belt";
import { useGetNmmParams } from "./use-get-nmm-params";

export function NmmCoreComponents() {
  const searchParams = useSearchParams();

  const searchQueryParams = searchParams.get("query") || "";
  const routeName = usePathname();
  const queryStr = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  const { level } = useGetNmmParams();

  const selectedBelt = useGetSelectedBelt();

  const [slicedByLevels, setSliced] = useState<any>({});
  const { data: authUser } = useCurrentAuthUser({});
  const brightMode = useBrightModeStore((state: any) => state.mode);

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

  // const lastAnswer = answers?.[answers?.length - 1];

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
  // const { data: componentsAll } = useListComponents({
  //   includeAll: true,
  // });

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

  // const { data: filteredComponents } = useListComponentsByBelt();

  const learnedComps =
    (isComponentsLoading ? chineseCharacters : components)
      ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel)
      // ?.filter((comp: any) => comp?.level < 100)
      .filter((prop: any) => {
        // const learnedChar = learnedCharacters2?.find(
        //   (char: any) => char?.hanzi === prop?.hanzi
        // );

        // if (!brightMode && learnedChar?.status === "forgotten") {
        //   return null;
        // }
        if (!brightMode && prop?.status === "forgotten") {
          return null;
        }

        return true;
      }) || [];

  // const learnedComps = filteredComponents
  //   // ?.filter((comp: any) => comp?.level < 100)
  //   .filter((prop: any) => {
  //     const learnedChar = learnedCharacters2?.find(
  //       (char: any) => char?.hanzi === prop?.hanzi
  //     );

  //     if (!brightMode && learnedChar?.status === "forgotten") {
  //       return null;
  //     }

  //     return true;
  //   });

  const sliced = slicedByLevels?.[level] || 100;

  if (learnedComps?.length === 0) {
    return <Nothing message={"You have learned everything in this belt"} />;
  }

  // return "TODO";
  return (
    <div className="mb-24">
      <NmmListContainer>
        {learnedComps?.slice(0, sliced).map((prop: any, idx: number) => {
          return (
            <TooltipProvider key={`${prop.hanzi}-chars-${idx}`}>
              <Tooltip>
                <TooltipTrigger className="hover:scale-125 transition">
                  <HanziLink character={prop} />
                </TooltipTrigger>
                <TooltipContent className="bg-black border-gray-800">
                  <PreviewComponent component={prop} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </NmmListContainer>

      {learnedComps?.length < sliced ? null : (
        <div className="flex justify-center items-center mb-24 mt-12">
          <button
            onClick={() => {
              setSliced((prev: any) => {
                return {
                  ...prev,
                  [level]: (prev?.[level] || 100) + 100,
                };
              });
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
