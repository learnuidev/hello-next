"use client";

import React from "react";

import { WordItem } from "../word-item";
import { RelatedWords } from "./related-words";
import { useRelatedHskWordsByCharacter } from "./use-filter-related-hsk-words-by-character";

export const RelatedHskWords = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  const filteredRelatedHskWords = useRelatedHskWordsByCharacter({
    characterId,
  });

  if (!filteredRelatedHskWords?.length) {
    return <RelatedWords lang={lang} characterId={characterId} />;
  }

  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white grid md:grid-cols-8 sm:grid-cols-4 grid-cols-2">
      {filteredRelatedHskWords?.map((prop: any, idx: any) => {
        return (
          <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
        );
      })}
    </div>
  );
};
