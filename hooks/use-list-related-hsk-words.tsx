import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

export const useListRelatedHSKWords = (characterId: string) => {
  const { data } = useListHSKWordsQuery();

  const uniqueWords = [
    ...(new Set(
      data
        ?.filter((item: any) => item?.hanzi?.includes(characterId))
        ?.map((item: any) => item?.hanzi)
    ) as any),
  ];
  return {
    data: uniqueWords?.map((word) => {
      const item = data?.filter((item: any) => item?.hanzi === word)?.[0];
      const itemEn = data?.filter(
        (item: any) => item?.hanzi === word && item?.en
      )?.[0];
      return { ...item, en: itemEn?.en || item?.en };
    }),
  };
};
