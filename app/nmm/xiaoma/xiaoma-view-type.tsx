"use client";
import React from "react";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";

import { useGetXiaoma } from "./use-get-xiaoma";

export function XiaomaViewType({
  variant,
}: {
  variant?: "core" | "needs_review" | "all";
}) {
  const { data } = useGetXiaoma({ variant });

  const xiaomaCharacters = data?.xiaomaCharacters || [];
  const xiaomaWords = data?.xiaomaWords || [];
  const xiaomaSentences = data?.xiaomaSentences || [];

  const viewType = useSearchQueryStore((state) => state.type);

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
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
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
