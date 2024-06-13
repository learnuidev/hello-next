"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { belts, calculateColor, filterComponents } from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";
import { NmmAllComponents } from "./nmm-all-components";
import { Icons } from "@/components/ui/icons.v2";

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
    singleItemsOnly: true,
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
    <Tabs defaultValue="core" className="p-0">
      <div className="my-2 md:my-8 flex justify-between items-center md:mx-12 flex-col md:flex-row space-y-4 md:space-y-0">
        <TabsList className="space-x-8">
          <TabsTrigger
            value="core"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <Icons.rocket className="text-xl md:text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            value="needs_review"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <Icons.graduationCap className="text-xl md:text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            // value="learned"
            value="all"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <Icons.globeAsia className="text-xl md:text-2xl" />
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

      <TabsContent value="core" className="my-4 md:my-8">
        <NmmAllComponents />
      </TabsContent>

      {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

      <TabsContent value="needs_review" className="my-4 md:my-8">
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
              <div className="p-2 md:p-3" key={`${prop.hanzi}-chars-${idx}`}>
                <Link
                  href={`/nmm/${prop.hanzi}?lang=zh`}
                  onClick={() => {
                    addHistoryMutation.mutate({
                      pathName: routeName,
                      input: prop.input,
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
      </TabsContent>

      <TabsContent value="all" className="my-4 md:my-8">
        <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
          {(queryStr ? filteredComponents : discoveredComponents)
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
                      addHistoryMutation.mutate({
                        input: prop.input,
                        lang: "zh",
                        pathName: routeName,
                        contentId: prop.id,
                        eventType: "CONTENT_VIEWED",
                      } as any);
                    }}
                    className={`${
                      // learnedCharacters.includes(prop?.hanzi)
                      learnedChar
                        ? learnedChar?.forgottenAt &&
                          learnedChar?.status === "forgotten"
                          ? `${color} text-gray-800`
                          : `${color} text-gray-300`
                        : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                          ? "text-yellow-500"
                          : selectedComp?.group
                            ? "text-slate-400"
                            : "dark:text-gray-500"
                    } p-3 text-2xl md:text-2xl transition lowercase`}

                    // className={`${
                    //   // learnedCharacters.includes(prop?.hanzi)
                    //   learnedCharacters2?.find(
                    //     (char: any) => char?.hanzi === prop?.hanzi
                    //   )
                    //     ? `hover:${color} text-gray-800`
                    //     : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                    //       ? "text-yellow-500"
                    //       : selectedComp?.group
                    //         ? "text-slate-400"
                    //         : "dark:text-gray-500 text-gray-200"
                    // } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
                  >
                    {prop?.hanzi}
                  </Link>
                </div>
              );
            })}
        </div>
      </TabsContent>
    </Tabs>
  );
}
