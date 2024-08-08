"use client";

import React from "react";

import { WordItem } from "../word-item";
import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { useBeltStore } from "../use-belt-store";
import { HanziLink } from "../hanzi-link";
import { useListComponents } from "@/domain/lesson/component.queries";
import { chineseCharacters } from "@/langs/chinese /characters";
import { RelatedWords } from "./related-words";

export const RelatedHskWords = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { data: relatedHskWords } = useListRelatedHSKWords(characterId);

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  const filteredRelatedHskWords = relatedHskWords
    ?.filter((item: any) => (item?.hanzi || item?.input)?.length <= 4)
    // ?.filter((item) => item?.level === 2)
    ?.sort((a, b) => a?.hanzi?.length - b?.hanzi?.length);

  if (!filteredRelatedHskWords?.length) {
    return <RelatedWords lang={lang} characterId={characterId} />;
  }

  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white grid md:grid-cols-8 sm:grid-cols-4 grid-cols-2">
      {filteredRelatedHskWords?.map((prop: any, idx: any) => {
        // const comp = comps?.find((c: any) => c?.hanzi === prop?.hanzi);
        // return (
        //   <HanziLink
        //     character={{ ...prop, ...comp }}
        //     key={`${prop.hanzi}-chars-${idx}`}
        //   />
        // );
        return (
          <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
        );
      })}
    </div>
  );
};
