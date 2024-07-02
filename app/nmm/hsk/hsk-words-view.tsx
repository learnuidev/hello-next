"use client";

import React, { useMemo } from "react";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";

import { useHSKLevelStore } from "../hsk-level-store";
import { resolveHsk } from "./utils";

export const HskWordsView = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: hskWords } = useListHSKWordsQuery();
  const level = useHSKLevelStore((state) => state.level);

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level }),
    [queryStr, hskWords, variant, level]
  );

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {resolvedHskWords?.map((prop: any, idx: number) => {
        return (
          <div key={`${prop.hanzi}-chars-${idx}`}>
            <HanziLink character={prop} />
          </div>
        );
      })}
    </div>
  );
};
