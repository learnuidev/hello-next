"use client";
import React from "react";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";

import { useGetContent } from "./use-get-content";
import { useBeltStore } from "@/components/use-belt-store";
import { belts } from "../utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { chineseCharacters } from "@/langs/chinese /characters";
import { NmmListContainer } from "@/components/nmm-list-container";

export function ContentViewType({
  variant,
  contentId,
}: {
  variant?: "core" | "needs_review" | "all";
  contentId: string;
}) {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { data } = useGetContent({ variant, selectedBelt, contentId });

  console.log("DATAA", data);

  const xiaomaCharacters = data?.characters || [];
  const xiaomaWords = data?.words || [];
  const xiaomaSentences = data?.sentences || [];

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  const viewType = useSearchQueryStore((state) => state.type);

  if (viewType === "sentence") {
    return (
      <NmmListContainer>
        {xiaomaSentences?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </NmmListContainer>
    );
  }

  if (viewType === "character") {
    return (
      <NmmListContainer>
        {xiaomaCharacters.map((prop: any, idx: number) => {
          console.log("XIAOMA", prop);

          const comp = comps?.find((c: any) => c?.hanzi === prop?.hanzi);
          return (
            <HanziLink
              character={comp || prop}
              key={`${prop.hanzi}-chars-${idx}`}
            />
          );
        })}
      </NmmListContainer>
    );
  }

  if (viewType === "word") {
    return (
      <NmmListContainer>
        {xiaomaWords?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </NmmListContainer>
    );
  }
}
