"use client";

import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainer } from "@/components/nmm-list-container";
import { useGetSimilarLookingCharacters } from "./use-get-similar-looking-characters";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";

export const SimilarCharactersView = ({
  componentId,
}: {
  componentId: string;
}) => {
  const similarLookingCharacters = useGetSimilarLookingCharacters(componentId);

  return (
    <NmmListContainerAll className="px-0">
      {similarLookingCharacters
        ?.filter((prop) => {
          return prop?.hanzi !== componentId;
        })
        ?.map((prop, idx: any) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
    </NmmListContainerAll>
  );
};
