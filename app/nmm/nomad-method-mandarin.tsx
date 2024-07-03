"use client";
import React, { useEffect, useMemo } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  belts,
  calculateColor,
  filterComponents,
  filterNonHanYu,
} from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";
import { NmmCoreComponents } from "./nmm-core-components";
import { Icons } from "@/components/ui/icons.v2";
import { AllComponents } from "./all-components";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { course1 } from "@/data/convos/bm1";
import { XiaomaView } from "./xiaoma/xiaoma";
import { cn } from "@/lib/utils";
import { HanziLink } from "@/components/hanzi-link";
import { useQuery } from "@tanstack/react-query";
import { HskView } from "./hsk/hsk";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { HSKCombobox } from "./hsk-combobox";
import { useHSKLevelStore } from "./hsk-level-store";
import { useHskViewStore } from "./hsk/state";
import { resolveHsk } from "./hsk/utils";

export function NomadMethodMandarin() {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";
  const routeName = usePathname();
  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);
  const queryStr = useSearchQueryStore((state) => state.query);
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

  const setLevel = useHSKLevelStore((state) => state.setLevel);
  const hskLevel = useHSKLevelStore((state) => state.level);

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

  return (
    <XiaomaView>
      <Tabs defaultValue="core" className="p-0">
        <div className="my-2 md:my-8 flex justify-between items-center md:mx-12 flex-col md:flex-row space-y-4 md:space-y-0">
          <TabsList className="space-x-8">
            <TabsTrigger
              value="core"
              className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
            >
              <Icons.rocket className="text-xl md:text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              value="needs_review"
              className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
            >
              <Icons.graduationCap className="text-xl md:text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              // value="learned"
              value="all"
              className={cn(
                "px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
              )}
            >
              <Icons.globeAsia className="text-xl md:text-2xl" />
            </TabsTrigger>
          </TabsList>

          {(queryStr?.includes("hsk") || mode === "hsk") && (
            <div className="space-x-8">
              <button
                onClick={() => {
                  setViewType("character");
                }}
                className={cn(
                  viewType === "character"
                    ? "dark:text-white"
                    : " text-gray-500",
                  "px-0 "
                )}
              >
                <Icons.seedling className="text-xl md:text-2xl" />
              </button>
              <button
                onClick={() => {
                  setViewType("word");
                }}
                className={cn(
                  viewType === "word" ? "dark:text-white" : " text-gray-500",
                  "px-0"
                )}
              >
                <Icons.tree className="text-xl md:text-2xl" />
              </button>
              <button
                // value="learned"

                onClick={() => {
                  setViewType("sentence");
                }}
                className={cn(
                  viewType === "sentence" ? "dark:text-white" : "text-gray-500",
                  "px-0 "
                )}
              >
                <Icons.trees className="text-xl md:text-2xl" />
              </button>
            </div>
          )}

          <div className="flex items-center">
            <div className="mx-12">
              {topics?.length > 0 && (
                <div>
                  <Select
                    value={hskView}
                    onValueChange={(topic) => {
                      setHskView(selectedBelt?.hskLevel, topic);
                    }}
                  >
                    <SelectTrigger className="w-[180px] dark:border-gray-800">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-black dark:border-gray-900">
                      <SelectGroup>
                        <SelectLabel>Topics</SelectLabel>

                        {topics?.map((topic) => {
                          return (
                            <SelectItem value={topic} key={topic}>
                              {topic}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {mode === "hsk" ? (
              <div className="space-x-4">
                {belts?.map?.((belt) => {
                  return (
                    <button
                      key={belt?.fill}
                      onClick={() => {
                        // setSelectedBelt(belt as any);
                        setLevel(belt?.hskLevel);
                      }}
                      className={`${
                        belt?.hskLevel === hskLevel
                          ? belt?.fill
                          : belt?.unselected
                      } h-4 w-4 rounded-full text`}
                    ></button>
                  );
                })}
              </div>
            ) : (
              // <div className="mx-8">
              //   <HSKCombobox />
              // </div>
              <div className="space-x-4">
                {belts?.map?.((belt) => {
                  return (
                    <button
                      key={belt?.fill}
                      onClick={() => {
                        setSelectedBelt(belt as any);
                      }}
                      className={`${
                        belt?.level === (selectedBelt?.level as any)
                          ? belt?.fill
                          : belt?.unselected
                      } h-4 w-4 rounded-full text`}
                    ></button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <TabsContent value="core" className="my-4 md:my-8">
          <HskView type={viewType}>
            <NmmCoreComponents />
          </HskView>
        </TabsContent>

        {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

        <TabsContent value="needs_review" className="my-4 md:my-8">
          <HskView type={viewType}>
            <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
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
                  <div key={`${prop.hanzi}-chars-${idx}`}>
                    <Link
                      href={`/nmm/${prop.hanzi}?lang=zh`}
                      onClick={() => {
                        // addHistoryMutation.mutate({
                        //   pathName: routeName,
                        //   input: prop.input,
                        //   lang: "zh",
                        //   contentId: prop.id,
                        //   eventType: "CONTENT_VIEWED",
                        // } as any);
                      }}
                      className={`${
                        // learnedCharacters.includes(prop?.hanzi)
                        learnedCharacters2?.find(
                          (char: any) => char?.hanzi === prop?.hanzi
                        )
                          ? `hover:${color} text-gray-300`
                          : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                            ? "text-yellow-500"
                            : selectedComp?.group
                              ? "text-slate-400"
                              : "dark:text-gray-500 text-gray-200"
                      } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
                    >
                      {prop?.hanzi}
                    </Link>
                  </div>
                );
              })}
            </div>
          </HskView>
        </TabsContent>

        <TabsContent value="all" className="my-4 md:my-8">
          <HskView variant="all" type={viewType}>
            <AllComponents />
          </HskView>
        </TabsContent>
      </Tabs>
    </XiaomaView>
  );
}
