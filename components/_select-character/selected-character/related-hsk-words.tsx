"use client";

import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
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

  const { data: contentItems } = useListPublishedContentsQuery({});

  return (
    <NmmListContainerAll className="px-0">
      {filteredRelatedHskWords?.map((prop: any, idx: any) => {
        const contentItem = (contentItems?.items || [])?.filter((item: any) =>
          JSON.stringify(item?.hanzi || item?.input)?.includes(
            prop?.hanzi || prop?.input,
          ),
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
    </NmmListContainerAll>
  );
};
