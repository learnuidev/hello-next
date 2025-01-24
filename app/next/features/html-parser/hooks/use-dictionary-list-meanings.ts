import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "./use-jwt-token";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useDictionaryStore } from "./use-dictionary-store";

interface Meanings {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const useListDictionaryMeaningsQuery = (
  hanzi: string,
  options = {} as any
) => {
  const token = useJwtToken();

  const getDictionary = useDictionaryStore((state) => state.getDictionary);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  // const dictionaryList =

  const { data: hskWords } = useListHSKWordsQuery();

  return useQuery<Meanings[], Error>({
    queryKey: [
      "list-dictionary-meanings",
      token,
      hanzi,
      JSON.stringify(hskWords),
    ],
    enabled: Boolean(hanzi),
    retry: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      try {
        const found = getDictionary(hanzi);

        if (found) {
          console.log("FOUND dictionary", found);
          return found;
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

        const respWithHsk = respJson.map((item) => {
          const hskLevel = hskWords?.find(
            (hskWord: any) => hskWord?.hanzi === item?.hanzi
          );

          return {
            ...hskLevel,
            ...item,
          };
        });

        if (hskWords) {
          setDictionary(hanzi, respWithHsk);
        }

        return respWithHsk;
      } catch (err) {
        throw err;
      }
    },
    ...options,
  });
};
