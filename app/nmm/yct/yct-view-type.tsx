"use client";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";

import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { NmmListContainerSentence } from "@/components/nmm-list-container-sentence";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useGetSelectedBelt } from "../use-get-selected-belt";
import { useGetYct } from "./use-get-yct";

export function YctViewType({
  variant,
}: {
  variant?: "core" | "needs_review" | "all";
}) {
  const selectedBelt = useGetSelectedBelt();

  const { data } = useGetYct({ variant, selectedBelt });

  const xiaomaCharacters = data?.characters || [];
  const xiaomaWords = data?.words || [];
  const xiaomaSentences = data?.sentences || [];

  const viewType = useSearchQueryStore((state) => state.type);

  const { data: chineseCharacters } = useListChineseCharactersQuery();

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  if (viewType === "sentence") {
    return (
      <NmmListContainerSentence>
        {xiaomaSentences?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </NmmListContainerSentence>
    );
  }

  if (viewType === "character") {
    return (
      <NmmListContainerAll>
        {xiaomaCharacters.map((prop: any, idx: number) => {
          const comp = comps?.find((c: any) => c?.hanzi === prop?.hanzi);
          return (
            <HanziLink
              character={comp || prop}
              key={`${prop.hanzi}-chars-${idx}`}
            />
          );
        })}
      </NmmListContainerAll>
    );
  }

  if (viewType === "word") {
    return (
      <NmmListContainerAll>
        {xiaomaWords?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </NmmListContainerAll>
    );
  }
}
