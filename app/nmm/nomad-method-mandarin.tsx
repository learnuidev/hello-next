"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  belts,
  calculateColor,
  filterComponent,
  filterComponents,
} from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/pro-light-svg-icons";
import { faGraduationCap, faLightbulb } from "@fortawesome/pro-thin-svg-icons";

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

export function NomadMethodMandarin() {
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
  });

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

  return (
    <Tabs defaultValue="all" className="p-0">
      <div className="my-8 flex justify-between items-center md:mx-12">
        <TabsList className="space-x-8">
          <TabsTrigger
            value="all"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faGlobeAsia} className="text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            value="needs_review"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            // value="learned"
            value="discovered"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
          </TabsTrigger>
        </TabsList>

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
      </div>

      <TabsContent value="all" className="my-8">
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
      </TabsContent>

      {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

      <TabsContent value="discovered" className="my-8">
        <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
          {discoveredComponents?.map((prop: any, idx: number) => {
            const selectedComp = components?.find(
              (component: any) => component?.hanzi === prop?.hanzi
            );

            const color = calculateColor({
              tone: selectedComp?.tone_level,
            });

            return (
              <Link
                key={`${prop.hanzi}-chars-${idx}`}
                href={`/nmm/${prop.hanzi}?lang=zh`}
                onClick={() => {
                  addHistoryMutation.mutate({
                    hanzi: prop.hanzi,
                    lang: "zh",
                    pathName: routeName,
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
                      : "dark:text-gray-500 text-gray-200"
                } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
              >
                {prop?.hanzi}
              </Link>
            );
          })}
        </div>
      </TabsContent>
      <TabsContent value="needs_review" className="my-8">
        <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
          {learnedCharacters2
            ?.filter(
              (character: any) =>
                character?.status !== "learned" &&
                character?.level >= selectedBelt?.minCharacterLevel &&
                character?.level <= selectedBelt?.maxCharacterLevel
            )
            ?.map((prop: any, idx: number) => {
              const selectedComp = components?.find(
                (component: any) => component?.hanzi === prop?.hanzi
              );

              const color = calculateColor({
                tone: selectedComp?.tone_level,
              });

              return (
                <Link
                  key={`${prop.hanzi}-chars-${idx}`}
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
                        : "dark:text-gray-500 text-gray-200"
                  } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
                >
                  {prop?.hanzi}
                </Link>
              );
            })}
        </div>
      </TabsContent>
    </Tabs>
  );
}
