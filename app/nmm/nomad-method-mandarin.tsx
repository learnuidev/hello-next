"use client";
import { useEffect, useMemo } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { TabsContent } from "@/components/ui/tabs";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { AllComponents } from "./all-components";
import { HskView } from "./hsk/hsk";
import { useHskViewStore } from "./hsk/state";
import { NmmCoreComponents } from "./nmm-core-components";
import { XiaomaView } from "./xiaoma/xiaoma-view";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainer } from "@/components/nmm-list-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchResults } from "../(auth)/insights/insights-v2/precision-insight-view/search-results";
import { useGetInsightSearchResults } from "../(auth)/insights/insights-v2/precision-insight-view/use-get-insight-search-results";
import { ContentView } from "./content/content-view";
import { resolveHsk } from "./hsk/hsk-utils/resolve-hsk";
import { calculateColor } from "./nmm-utils/calculate-color";
import { filterComponents } from "./nmm-utils/filter-components";
import { NomadMethodTabsContainer } from "./nomad-method-tabs-container";
import { PreviewComponent } from "./preview-component";
import { useGetSelectedBelt } from "./use-get-selected-belt";
import { YctView } from "./yct/yct-view";

export function NomadMethodMandarin() {
  const selectedBelt = useGetSelectedBelt();
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";
  const routeName = usePathname();

  const queryStr = useSearchQueryStore((state) => state.query);
  const queryStrSync = useSearchQueryStore((state) => state.querySync);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  const { data: hskWords } = useListHSKWordsQuery();
  const mode = useLearningModeStore((state: any) => state.mode);

  const addHistoryMutation = useAddHistoryMutation();

  const viewType = useSearchQueryStore((state) => state.type);
  const setViewType = useSearchQueryStore((state) => state.setType);

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

  const filteredComponents = filterComponents({
    components: slicedComponents,
    query: queryStr,
    characters: learnedCharacters2,
  });

  const hskView = (useHskViewStore((state) => state.view) as any)?.[
    selectedBelt?.hskLevel
  ];
  const setHskView = useHskViewStore((state) => state.setView);

  const resolvedHskWords = useMemo(
    () =>
      resolveHsk(queryStr, {
        hskWords,
        variant: "all",
        level: selectedBelt?.hskLevel,
      }),
    [queryStr, hskWords, selectedBelt?.hskLevel]
  );

  const topics = [
    "All",
    ...(new Set(resolvedHskWords?.map((word: any) => word?.topic)) as any),
  ];

  const router = useRouter();

  const searchResults = useGetInsightSearchResults("all");

  if (queryStrSync) {
    return (
      <div className="mx-4 md:mx-48">
        <SearchResults searchResults={searchResults} />
      </div>
    );
  }

  return (
    <ContentView>
      <YctView>
        <XiaomaView>
          <NomadMethodTabsContainer>
            <TabsContent value="core" className="my-4 md:my-8">
              <HskView type={viewType}>
                <NmmCoreComponents />
              </HskView>
            </TabsContent>

            <TabsContent value="needs_review" className="my-4 md:my-8">
              <HskView type={viewType}>
                <NmmListContainer>
                  {(queryStr
                    ? filteredComponents
                    : learnedCharacters2?.filter(
                        (character: any) =>
                          character?.status === "needs_review" &&
                          character?.level >= selectedBelt?.minCharacterLevel &&
                          character?.level <= selectedBelt?.maxCharacterLevel
                      )
                  )?.map((prop: any, idx: number) => {
                    const selectedComp = components?.find(
                      (component: any) => component?.hanzi === prop?.hanzi
                    );

                    const color = calculateColor({
                      tone: selectedComp?.tone_level,
                    });

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
              </HskView>
            </TabsContent>

            <TabsContent value="all" className="my-4 md:my-8">
              <HskView variant="all" type={viewType}>
                <AllComponents />
              </HskView>
            </TabsContent>
          </NomadMethodTabsContainer>
        </XiaomaView>
      </YctView>
    </ContentView>
  );
}
