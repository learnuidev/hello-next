"use client";
import { useMemo } from "react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useBeltStore } from "@/components/use-belt-store";
import { belts } from "./utils";

import { useRouter, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { Icons } from "@/components/ui/icons.v2";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { cn } from "@/lib/utils";

import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";

import { useHSKLevelStore } from "./hsk-level-store";
import { useHskViewStore } from "./hsk/state";

import { useListContentsQuery } from "@/domain/content/content.queries";
import { FilterSelect } from "./filter-select";
import { resolveHsk } from "./hsk/hsk-utils/resolve-hsk";
import { useGetNmmParams } from "./use-get-nmm-params";

export function NomadMethodNavbar() {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const searchParams = useSearchParams();

  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);
  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: hskWords } = useListHSKWordsQuery();
  const mode = useLearningModeStore((state: any) => state.mode);

  const viewType = useSearchQueryStore((state) => state.type);
  const setViewType = useSearchQueryStore((state) => state.setType);

  const setLevel = useHSKLevelStore((state) => state.setLevel);
  const hskLevel = useHSKLevelStore((state) => state.level);

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

  const { data: contents } = useListContentsQuery();

  const value = "hsk";

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

  const { tab, viewMode } = useGetNmmParams();

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
                router.push(`/nmm?tab=${tab}&view-mode=${viewMode}`);
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
                router.push(`/nmm?tab=${tab}&view-mode=${viewMode}`);
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
              setLevel(beltIdInt);
              setSelectedBelt(belt);
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
                {(mode === "hsk3" ? belts : belts.slice(0, 6))?.map?.(
                  (belt) => {
                    return (
                      <button
                        key={belt?.fill}
                        onClick={() => {
                          setLevel(belt?.hskLevel);
                        }}
                        className={`${
                          belt?.hskLevel === hskLevel
                            ? belt?.fill
                            : belt?.unselected
                        } h-4 w-4 rounded-full text`}
                      ></button>
                    );
                  }
                )}
              </div>
            ) : mode === "yct" ? (
              <div className="space-x-4">
                {belts?.slice(0, 4).map?.((belt) => {
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
            ) : (
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
      </div>
    </>
  );
}
