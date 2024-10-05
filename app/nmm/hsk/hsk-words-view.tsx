"use client";

import React, { useMemo } from "react";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useHSKLevelStore } from "../hsk-level-store";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useHskViewStore } from "./state";
import { useBeltStore } from "@/components/use-belt-store";
import { resolveHsk } from "./hsk-utils/resolve-hsk";

export const HskWordsView = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const hskView = (useHskViewStore((state) => state.view) as any)?.[
    selectedBelt?.hskLevel
  ];
  const setHskView = useHskViewStore((state) => state.setView);

  const { data: hskWords } = useListHSKWordsQuery();
  const level = useHSKLevelStore((state) => state.level);

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level, topic: hskView }),
    [queryStr, hskWords, variant, level, hskView]
  );

  const filteredWords = resolvedHskWords?.filter((item: any) => {
    if (!item?.topic || hskView === "All") {
      return true;
    }
    return item?.topic === hskView;
  });

  const topics = [
    "All",
    ...(new Set(resolvedHskWords?.map((word: any) => word?.type)) as any),
  ];

  return (
    <div>
      {/* <div className="mx-12">
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
      </div> */}
      <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
        {filteredWords?.map((prop: any, idx: number) => {
          return (
            <div key={`${prop.hanzi}-chars-${idx}`} className="relative">
              <HanziLink character={prop} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
