import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "./use-jwt-token";

interface Meanings {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const useListDictionaryMeaningsQuery = (hanzi: string) => {
  const token = useJwtToken();

  return useQuery<Meanings[], Error>({
    queryKey: ["list-dictionary-meanings", token, hanzi],
    enabled: Boolean(hanzi),
    retry: false,
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

        return res.json();
      } catch (err) {
        throw err;
      }
    },
  });
};
