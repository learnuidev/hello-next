"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { belts, calculateColor, filterNonHanYu } from "../utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { Icons } from "@/components/ui/icons.v2";

import { course1 } from "@/data/convos/bm1";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

const getLevel = (queryStr: string) => {
  if (queryStr?.includes("1")) {
    return 1;
  }
  if (queryStr?.includes("2")) {
    return 2;
  }
  if (queryStr?.includes("3")) {
    return 3;
  }
  if (queryStr?.includes("4")) {
    return 4;
  }
  if (queryStr?.includes("5")) {
    return 5;
  }
  if (queryStr?.includes("6")) {
    return 6;
  }
  if (
    queryStr?.includes("7") ||
    queryStr?.includes("8") ||
    queryStr?.includes("9")
  ) {
    return 9;
  }

  return 1;
};

export const XiaomaView = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "all";
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  if (!queryStr?.includes("xiaoma")) {
    return children;
  }

  return <Xiaoma />;
};

function Xiaoma() {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";
  const { data: hskWords } = useListHSKWordsQuery();

  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);

  const setQuery = useSearchQueryStore((state) => state.setQuery);

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

  const xiaomaCharacters = [
    ...new Set(
      course1?.lessons
        .map((x: any) => x.lessons)
        .flat()
        .map((x: any) => x.id)
        .join()
        .split("")
    ),
  ]
    .filter((val: any) => filterNonHanYu(val))
    .map((id) => {
      return {
        hanzi: id,
        lang: "zh",
      };
    });

  const xiaomaSentences = [
    ...new Set(
      course1?.lessons
        .map((x: any) => x.lessons)
        .flat()
        .map((x: any) => x.id)
    ),
  ]
    .filter((val: any) => filterNonHanYu(val))
    .filter((item: any) => {
      return item.split("").every((val: any) => {
        const selectedComp = components?.find(
          (component: any) => component?.hanzi === val
        );

        return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
      });
    })
    .map((id) => {
      return {
        hanzi: id,
        lang: "zh",
      };
    });

  const xiaomaWords = hskWords
    ?.filter((word: any) => {
      return JSON.stringify(xiaomaSentences)?.includes(word?.hanzi);
    })
    .filter((item: any) => {
      return item.hanzi?.split("").every((val: any) => {
        const selectedComp = components?.find(
          (component: any) => component?.hanzi === val
        );

        return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
      });
    });

  return (
    <Tabs defaultValue="characters" className="p-0">
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
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.globeAsia className="text-xl md:text-2xl" />
          </TabsTrigger>
        </TabsList>

        <TabsList className="space-x-8">
          <TabsTrigger
            value="characters"
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.seedling className="text-xl md:text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            value="words"
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.tree className="text-xl md:text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            // value="learned"
            value="sentences"
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.trees className="text-xl md:text-2xl" />
          </TabsTrigger>
        </TabsList>

        {
          <div className="space-x-4">
            {belts?.map?.((belt) => {
              return (
                <button
                  key={belt?.fill}
                  onClick={() => {
                    setSelectedBelt(belt as any);
                  }}
                  className={`${
                    selectedBelt !== null &&
                    belt?.level === (selectedBelt?.level as any)
                      ? belt?.fill
                      : belt?.unselected
                  } h-4 w-4 rounded-full text`}
                ></button>
              );
            })}
          </div>
        }
      </div>

      <TabsContent value="characters" className="my-4 md:my-8">
        <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
          {xiaomaCharacters

            .filter((prop: any, idx: number) => {
              const selectedComp = components?.find(
                (component: any) => component?.hanzi === prop?.hanzi
              );

              return (
                selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
                selectedComp?.level >= selectedBelt?.minCharacterLevel
              );
            })

            .map((prop: any, idx: number) => {
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
      </TabsContent>

      {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

      <TabsContent value="words" className="my-4 md:my-8">
        <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
          {xiaomaWords?.map((prop: any, idx: number) => {
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
      </TabsContent>

      <TabsContent value="sentences" className="my-4 md:my-8">
        <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
          {xiaomaSentences?.map((prop: any, idx: number) => {
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
      </TabsContent>
    </Tabs>
  );
}
