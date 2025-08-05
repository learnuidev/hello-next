import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";
import { useContentsStore } from "@/domain/content/content.queries";
import { useMemo } from "react";

export function useGetCharacterLearningContext({
  lang,
  characterId,
}: {
  lang: string;
  characterId: string;
}) {
  const data: any = useContentsStore((state) => state.contents);

  const items = useMemo(
    () =>
      data?.items
        ?.map((item: any) => {
          return item?.transcriptions?.map((t: any) => {
            return {
              ...t,
              contentId: item?.id,
            };
          });
        })
        ?.flat()
        ?.filter(
          (item: any) =>
            (item?.hanzi?.toLowerCase()?.includes(characterId) ||
              item?.input?.toLowerCase()?.includes(characterId)) &&
            item?.lang === lang
        )
        ?.sort(
          (a: any, b: any) =>
            (a?.hanzi || a?.input)?.length - (b?.hanzi || b?.input)?.length
        ),
    [characterId, data?.items, lang]
  );

  return items;
}
