"use client";
import { useMemo } from "react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBeltStore } from "@/components/use-belt-store";
import { belts } from "./utils";

import { useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { Icons } from "@/components/ui/icons.v2";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { cn } from "@/lib/utils";

import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";

import { useHSKLevelStore } from "./hsk-level-store";
import { useHskViewStore } from "./hsk/state";

import { resolveHsk } from "./hsk/hsk-utils/resolve-hsk";

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

  return (
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

      {(queryStr?.includes("hsk") ||
        mode === "hsk" ||
        mode === "hsk3" ||
        mode === "xiaoma") && (
        <div className="space-x-8">
          <button
            onClick={() => {
              setViewType("character");
            }}
            className={cn(
              viewType === "character" ? "dark:text-white" : " text-gray-500",
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
        {["hsk", "hsk3"]?.includes(mode) && (
          <div className="mx-12">
            {topics?.length > 0 && (
              <div>
                <Select
                  value={hskView}
                  onValueChange={(topic) => {
                    setHskView(selectedBelt?.hskLevel, topic);
                  }}
                >
                  <SelectTrigger className="w-[180px] dark:border-gray-800 border-gray-400">
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
        )}

        {mode === "hsk" ? (
          <div className="space-x-4">
            {(mode === "hsk3" ? belts : belts.slice(0, 6))?.map?.((belt) => {
              return (
                <button
                  key={belt?.fill}
                  onClick={() => {
                    setLevel(belt?.hskLevel);
                  }}
                  className={`${
                    belt?.hskLevel === hskLevel ? belt?.fill : belt?.unselected
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
  );
}
