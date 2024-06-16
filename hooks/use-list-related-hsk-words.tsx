import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

export const useListRelatedHSKWords = (characterId: string) => {
  const { data: hsk } = useListHSKWordsQuery();

  console.log("HSK", hsk);

  const { data: components } = useListComponents();
  const { data: characters } = useListCharactersQuery();

  const data = [...(hsk || []), ...(components || []), ...(characters || [])];

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
      return {
        ...item,
        en: itemEn?.en || item?.en,
        roman: itemEn?.roman || itemEn?.pinyin,
      };
    }),
  };
};
