"use client";

import { useSearchQueryStore } from "@/components/search/state";

import { HanziLink } from "@/components/hanzi-link";

import { NmmListContainer } from "@/components/nmm-list-container";
import { NmmListContainerSentence } from "@/components/nmm-list-container-sentence";
import { useListComponents } from "@/domain/lesson/component.queries";
import { chineseCharacters } from "@/langs/chinese /characters";
import { useGetSelectedBelt } from "../use-get-selected-belt";
import { useGetContent } from "./use-get-content";
import { SentencesViewV2 } from "@/components/_select-character/selected-character/sentences-view-v2";

export function ContentViewType({
  variant,
  contentId,
}: {
  variant?: "core" | "needs_review" | "all";
  contentId: string;
}) {
  const selectedBelt = useGetSelectedBelt();

  const { data } = useGetContent({
    variant,
    selectedBelt,
    contentId,
    returnAll: true,
  });

  const characters = data?.characters || [];
  const words = data?.words || [];
  const sentences = data?.sentences || [];

  // console.log("DATA", data);

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  const viewType = useSearchQueryStore((state) => state.type);

  if (viewType === "sentence") {
    return (
      <div className="mx-4 md:mx-12">
        <SentencesViewV2 relatedSentences={sentences} />
      </div>
    );
    return (
      <NmmListContainerSentence>
        {sentences?.map((prop: any, idx: number) => {
          return (
            <div key={`${prop.hanzi}-chars-${idx}`}>
              <p>{prop?.hanzi}</p>
            </div>
          );
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
        {characters.map((prop: any, idx: number) => {
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
        {words?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </NmmListContainer>
    );
  }
}
