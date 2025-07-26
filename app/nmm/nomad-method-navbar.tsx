"use client";
import { useMemo } from "react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { belts } from "./utils";

import { useRouter, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { Icons } from "@/components/ui/icons.v2";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { cn } from "@/lib/utils";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";

import { useHskViewStore } from "./hsk/state";

import { useListPublishedContentsQuery } from "../(auth)/convos/[content-id]/hooks/use-list-published-contents-query";
import { useIsContent } from "../review/use-is-content";
import { FilterSelect } from "./filter-select";
import { getNmmSearchParamsUrl } from "./get-nmm-params-url";
import { resolveHsk } from "./hsk/hsk-utils/resolve-hsk";
import { useGetNmmParams } from "./use-get-nmm-params";
import { useGetSelectedBelt } from "./use-get-selected-belt";

export function NomadMethodNavbar() {
  const selectedBelt = useGetSelectedBelt();
  const searchParams = useSearchParams();

  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: hskWords } = useListHSKWordsQuery();
  const { mode } = useLearningMode();

  const viewType = useSearchQueryStore((state) => state.type);
  const setViewType = useSearchQueryStore((state) => state.setType);

  const { tab, viewMode, level } = useGetNmmParams();

  const hskLevel = level;

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

  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;

  const value = "hsk";

  const isContent = useIsContent(mode);

  const contentTitles = useMemo(
    () => [
      { title: "all", id: "all" },
      { id: "hsk", title: "hsk" },
      { id: "hsk3", title: "hsk 3" },
      { id: "nmm", title: "nmm" },
      { id: "xiaoma", title: "xiaoma" },
      { id: "yct", title: "yct" },
      ...(contents || []),
    ],
    [contents]
  );

  const coreTitles = [
    { title: "Core", id: "core" },
    {
      title: "Needs Review",
      id: "needs_review",
    },

    {
      title: "All",
      id: "all",
    },
  ];

  let viewModes = ["hsk", "hsk3", "yct"]?.includes(mode)
    ? [
        {
          id: "character",
          title: "Character",
          icon: Icons.seedling,
        },
        {
          id: "word",
          title: "Word",
          icon: Icons.tree,
        },
      ]
    : [
        {
          id: "character",
          title: "Character",
          icon: Icons.seedling,
        },
        {
          id: "word",
          title: "Word",
          icon: Icons.tree,
        },
        {
          id: "sentence",
          title: "Sentence",
          icon: Icons.trees,
        },
      ];

  const router = useRouter();

  const isNonNmm =
    queryStr?.includes("hsk") ||
    ["xiaoma", "hsk", "hsk3"].includes(mode) ||
    mode !== "nmm";

  return (
    <>
      <div className="block sm:hidden">
        <div className="my-2 md:my-8 flex justify-between items-center gap-2 flex-row mx-4">
          {mode === "nmm" && (
            <FilterSelect
              title={"Select a topic"}
              value={tab}
              items={coreTitles}
              onValueChange={(tab) => {
                router.push(
                  `/nmm?${getNmmSearchParamsUrl({ level: level, tab })}`
                );
                // router.push(`/nmm?tab=${tab}&view-mode=${viewMode}`);
              }}
            />
          )}

          {isNonNmm && (
            <FilterSelect
              title={"Select view mode"}
              value={viewMode}
              items={viewModes}
              onValueChange={(viewMode) => {
                setViewType(viewMode);
                router.push(
                  `/nmm?${getNmmSearchParamsUrl({ level: level, tab, viewMode })}`
                );
                // router.push(`/nmm?tab=${tab}&view-mode=${viewMode}`);
              }}
            />
          )}

          <FilterSelect
            title={
              ["hsk", "hsk3"]?.includes(mode)
                ? "Select a level"
                : "Select a belt"
            }
            value={
              ["hsk", "hsk3"]?.includes(mode)
                ? `${hskLevel}`
                : `${selectedBelt?.hskLevel}`
            }
            items={(mode === "ycy"
              ? belts?.slice(0, 4)
              : mode === "hsk"
                ? belts?.slice(0, 6)
                : belts
            ).map((belt) => ({
              id: `${belt.hskLevel}`,
              title: `${["hsk", "hsk3"]?.includes(mode) ? "Level " : "Belt "} ${belt.hskLevel}`,
            }))}
            onValueChange={(beltId) => {
              const beltIdInt = parseInt(beltId);
              const belt = belts?.find((belt) => belt.hskLevel === beltIdInt);
              router.push(`/nmm?level=${belt?.hskLevel}`);
            }}
          />
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="my-2 md:my-8 flex justify-between items-center md:mx-12 flex-col md:flex-row space-y-4 md:space-y-0">
          {mode === "nmm" && (
            <TabsList className="space-x-8">
              <TabsTrigger
                value="core"
                className="px-0 data-[state=active]:text-black dark:data-[state=active]:text-white data-[state=inactive]:text-gray-600"
              >
                <Icons.rocket className="text-xl md:text-2xl" />
              </TabsTrigger>
              <TabsTrigger
                value="needs_review"
                className="px-0 data-[state=active]:text-black dark:data-[state=active]:text-white data-[state=inactive]:text-gray-600"
              >
                <Icons.graduationCap className="text-xl md:text-2xl" />
              </TabsTrigger>
              <TabsTrigger
                // value="learned"
                value="all"
                className={cn(
                  "px-0 data-[state=active]:text-black dark:data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                )}
              >
                <Icons.globeAsia className="text-xl md:text-2xl" />
              </TabsTrigger>
            </TabsList>
          )}

          {isNonNmm && (
            <div className="space-x-8">
              {viewModes?.map((viewMode) => {
                return (
                  <button
                    key={viewMode.id}
                    onClick={() => {
                      setViewType(viewMode.id);
                    }}
                    className={cn(
                      viewType === viewMode.id
                        ? "dark:text-white"
                        : " text-gray-500",
                      "px-0 "
                    )}
                  >
                    <viewMode.icon className="text-xl md:text-2xl" />
                  </button>
                );
              })}
            </div>
          )}

          {isContent ? null : (
            <div className="flex items-center">
              {["hsk", "hsk3"]?.includes(mode) && (
                <div className="mx-12">
                  {topics?.length > 0 && (
                    <div>
                      <FilterSelect
                        className="w-[180px]"
                        value={hskView}
                        onValueChange={(topic) => {
                          setHskView(selectedBelt?.hskLevel, topic);
                        }}
                        items={topics.map((topic) => ({
                          id: topic,
                          title: topic,
                        }))}
                        title={"Select a topic "}
                      />
                    </div>
                  )}
                </div>
              )}

              {mode === "hsk" ? (
                <div className="space-x-4">
                  {belts.slice(0, 6)?.map?.((belt) => {
                    return (
                      <button
                        key={belt?.fill}
                        onClick={() => {
                          router.push(
                            `/nmm?${getNmmSearchParamsUrl({ level: belt?.hskLevel, tab, viewMode })}`
                          );
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
              ) : mode === "yct" ? (
                <div className="space-x-4">
                  {belts?.slice(0, 4).map?.((belt) => {
                    return (
                      <button
                        key={belt?.fill}
                        onClick={() => {
                          router.push(
                            `/nmm?${getNmmSearchParamsUrl({ level: belt?.hskLevel, tab, viewMode })}`
                          );
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
                <div className="space-x-4">
                  {belts?.map?.((belt) => {
                    return (
                      <button
                        key={belt?.fill}
                        onClick={() => {
                          router.push(
                            `/nmm?${getNmmSearchParamsUrl({ level: belt?.hskLevel, tab, viewMode })}`
                          );
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
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
