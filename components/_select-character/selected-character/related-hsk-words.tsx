"use client";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainer } from "@/components/nmm-list-container";
import { RelatedWords } from "../related-words";
import { useRelatedHskWordsByCharacter } from "../use-filter-related-hsk-words-by-character";

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
    <NmmListContainer className="px-0">
      {filteredRelatedHskWords?.map((prop: any, idx: any) => {
        return (
          <HanziLink
            character={prop}
            key={`${prop.hanzi}-chars-${idx}`}
            enableTracking
          />
        );
      })}
    </NmmListContainer>
  );
};
