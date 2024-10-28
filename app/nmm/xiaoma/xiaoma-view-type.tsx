"use client";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";

import { NmmListContainer } from "@/components/nmm-list-container";
import { NmmListContainerSentence } from "@/components/nmm-list-container-sentence";
import { useBeltStore } from "@/components/use-belt-store";
import { useListComponents } from "@/domain/lesson/component.queries";
import { chineseCharacters } from "@/langs/chinese /characters";
import { useGetXiaoma } from "./use-get-xiaoma";

export function XiaomaViewType({
  variant,
}: {
  variant?: "core" | "needs_review" | "all";
}) {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { data } = useGetXiaoma({ variant, selectedBelt });

  const xiaomaCharacters = data?.xiaomaCharacters || [];
  const xiaomaWords = data?.xiaomaWords || [];
  const xiaomaSentences = data?.xiaomaSentences || [];

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  const viewType = useSearchQueryStore((state) => state.type);

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
