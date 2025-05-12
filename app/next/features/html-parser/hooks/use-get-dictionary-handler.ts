import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "./use-jwt-token";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useDictionaryStore } from "./use-dictionary-store";
import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";

interface Meanings {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const useGetDictionaryHandler = () => {
  const token = useJwtToken();

  const getDictionary = useDictionaryStore((state) => state.getDictionary);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  const { data: hskWords } = useListHSKWordsQuery();

  const getDictionaryHandler = async (hanzi: string) => {
    try {
      const found = getDictionary(hanzi);

      if (found) {
        return found?.filter((item: any) => filterNonHanYu(item?.hanzi));
      }

      console.log("Not found in cache, fetching dictionary");

      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/dictionary/list-meanings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            hanzi,
          }),
        }
      );

      const respJson = (await res.json()) as Meanings[];

      const respWithHsk = respJson
        .map((item) => {
          const hskLevel = hskWords?.find(
            (hskWord: any) => hskWord?.hanzi === item?.hanzi
          );

          return {
            ...hskLevel,
            ...item,
          };
        })
        .filter((item: any) => filterNonHanYu(item?.hanzi));

      if (hskWords) {
        setDictionary(hanzi, respWithHsk);
      }

      return respWithHsk;
    } catch (err) {
      throw err;
    }
  };

  return getDictionaryHandler;
};
