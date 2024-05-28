import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

export const useListRelatedHSKWords = (characterId: string) => {
  const { data } = useListHSKWordsQuery();
  return {
    data: data?.filter((item: any) => item?.hanzi?.includes(characterId)),
  };
};
