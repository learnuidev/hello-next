import { useListDictionaryQuery } from "@/app/(auth)/clipboard/hooks/use-list-dictionary-query";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { segmentText } from "@/libs/utils/segment-text";
import { useDictionaryStore } from "./use-dictionary-store";
import { useJwtToken } from "./use-jwt-token";

export const useGetDictionaryHandler = (lang: string) => {
  const { data: dictionaryItems } = useListDictionaryQuery(lang);

  const getDictionary = useDictionaryStore((state) => state.getDictionary);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  const { data: hskWords } = useListHSKWordsQuery();

  const getDictionaryHandler = async (text: string, lang: string) => {
    try {
      // const found = getDictionary(text);

      // if (found) {
      //   return found?.filter((item: any) =>
      //     filterNonHanYu(item?.hanzi || item?.input)
      //   );
      // }

      console.log("Not found in cache, fetching dictionary");

      const respJson = await segmentText({ text, lang });

      console.log("DICT ITEMS", dictionaryItems);

      // return respJson;

      const respWithHsk = respJson.map((item) => {
        const hskLevel = hskWords?.find(
          (hskWord: any) => hskWord?.hanzi === item?.input
        );

        return {
          // ...dictItem,
          ...hskLevel,
          ...item,
        };
      });
      // .filter((item: any) => filterNonHanYu(item?.input));

      // if (hskWords) {
      //   setDictionary(text, respWithHsk);
      // }

      return respWithHsk;
    } catch (err) {
      throw err;
    }
  };

  return getDictionaryHandler;
};
