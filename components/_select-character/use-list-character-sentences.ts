import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";
import { useMemo } from "react";
import { useContentViewStore } from "./use-content-view-store";

export const useListCharacterSentences = (characterId: string) => {
  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;

  const view = useContentViewStore((state) => state.view);

  const filteredContents = useMemo(
    () =>
      contents?.filter((content: any) => {
        if (view === "all") {
          return true;
        }

        return content?.title === view;
      }),
    [contents, view]
  );

  const allSentences = useMemo(
    () =>
      filteredContents
        ?.map((content: any) => content?.transcriptions)
        ?.flat()
        ?.sort(
          (a: any, b: any) =>
            JSON.stringify(a)?.length - JSON.stringify(b)?.length
        )
        ?.filter((item: any) => JSON.stringify(item)?.includes(characterId)),
    [characterId, filteredContents]
  );

  return allSentences;
};
