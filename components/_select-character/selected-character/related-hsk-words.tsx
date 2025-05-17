"use client";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainer } from "@/components/nmm-list-container";
import { RelatedWords } from "../related-words";
import { useRelatedHskWordsByCharacter } from "../use-filter-related-hsk-words-by-character";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

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

  const { data: contentItems } = useListPublishedContentsQuery({});

  if (!filteredRelatedHskWords?.length) {
    return <RelatedWords lang={lang} characterId={characterId} />;
  }

  return (
    <NmmListContainer className="px-0">
      {filteredRelatedHskWords?.map((prop: any, idx: any) => {
        const contentItem = (contentItems?.items || [])?.filter((item: any) =>
          JSON.stringify(item)?.includes(prop?.hanzi || prop?.input)
        );
        return (
          <HanziLink
            character={prop}
            key={`${prop.hanzi}-chars-${idx}`}
            enableTracking
            className={
              contentItem?.length > 0
                ? "font-bold dark:text-white text-black"
                : ""
            }
          />
        );
      })}
    </NmmListContainer>
  );
};
