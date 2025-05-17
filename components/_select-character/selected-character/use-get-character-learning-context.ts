import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

export function useGetCharacterLearningContext({
  lang,
  characterId,
}: {
  lang: string;
  characterId: string;
}) {
  const { data } = useListPublishedContentsQuery({});

  const items = data?.items
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
        (JSON.stringify(item?.hanzi)?.includes(characterId) ||
          JSON.stringify(item?.input)?.includes(characterId)) &&
        item?.lang === lang
    )
    ?.sort((a: any, b: any) => a?.hanzi?.length - b?.hanzi?.length);

  return items;
}
