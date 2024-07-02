"use client";

import React from "react";

import { WordItem } from "../word-item";
import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { useBeltStore } from "../use-belt-store";

export const RelatedHskWords = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { data: relatedHskWords } = useListRelatedHSKWords(characterId);

  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white grid md:grid-cols-8 sm:grid-cols-4 grid-cols-2">
      {relatedHskWords
        ?.filter((item: any) => (item?.hanzi || item?.input)?.length <= 4)
        // ?.filter((item) => item?.level === 2)
        ?.sort((a, b) => a?.hanzi?.length - b?.hanzi?.length)
        ?.map((prop: any) => {
          return (
            <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
          );
        })}
    </div>
  );
};
