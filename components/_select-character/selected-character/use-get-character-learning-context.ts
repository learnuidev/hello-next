import { useContentsStore } from "@/domain/content/content.queries";
import { useMemo } from "react";

export function useGetCharacterLearningContext({
  lang,
  characterId: _characterId,
}: {
  lang: string;
  characterId: any;
}) {
  const characterId =
    typeof _characterId === "string"
      ? _characterId
      : _characterId?.hanzi || _characterId?.input;
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
            (item?.hanzi?.toLowerCase()?.includes(characterId?.toLowerCase()) ||
              item?.input
                ?.toLowerCase()
                ?.includes(characterId?.toLowerCase())) &&
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
