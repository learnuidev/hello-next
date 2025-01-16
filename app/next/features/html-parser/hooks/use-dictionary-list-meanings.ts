import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "./use-jwt-token";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

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

        return respJson.map((item) => {
          const hskLevel = hskWords?.find(
            (hskWord: any) => hskWord?.hanzi === item?.hanzi
          );

          return {
            ...hskLevel,
            ...item,
          };
        });
      } catch (err) {
        throw err;
      }
    },
    ...options,
  });
};
