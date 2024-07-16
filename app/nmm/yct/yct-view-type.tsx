"use client";
import React from "react";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";

import { useGetYct } from "./use-get-yct";
import { useBeltStore } from "@/components/use-belt-store";
import { belts } from "../utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { chineseCharacters } from "@/langs/chinese /characters";

export function YctViewType({
  variant,
}: {
  variant?: "core" | "needs_review" | "all";
}) {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { data } = useGetYct({ variant, selectedBelt });

  const xiaomaCharacters = data?.characters || [];
  const xiaomaWords = data?.words || [];
  const xiaomaSentences = data?.sentences || [];

  const viewType = useSearchQueryStore((state) => state.type);

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  const containerStyle =
    "my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start";

  if (viewType === "sentence") {
    return (
      <div className={containerStyle}>
        {xiaomaSentences?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </div>
    );
  }

  if (viewType === "character") {
    return (
      <div className={containerStyle}>
        {xiaomaCharacters.map((prop: any, idx: number) => {
          const comp = comps?.find((c: any) => c?.hanzi === prop?.hanzi);
          return (
            <HanziLink
              character={comp || prop}
              key={`${prop.hanzi}-chars-${idx}`}
            />
          );
        })}
      </div>
    );
  }

  if (viewType === "word") {
    return (
      <div className={containerStyle}>
        {xiaomaWords?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </div>
    );
  }
}
