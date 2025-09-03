import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { siteConfig } from "@/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listDictionaryQueryKey,
  useListDictionaryQuery,
} from "./use-list-dictionary-query";
// import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

export const getDictionaryQueryKey = "get-dictionary";
export const useGetDictionaryQuery = (lang: string, word: string) => {
  const token = useJwtToken();

  const queryClient = useQueryClient();

  const { data } = useListDictionaryQuery(lang);
  return useQuery<any>({
    queryKey: [getDictionaryQueryKey, lang, word, JSON.stringify(data)],
    queryFn: async () => {
      if (data?.length > 0) {
        const item = data?.filter(
          (val: any) =>
            val?.id?.split("#")?.[0]?.toLowerCase() === word?.toLowerCase()
        );

        if (item?.[0]) {
          return item?.[0];
        }

        const res = await fetch(
          `${siteConfig.apiUrlV2}/v1/dictionary/add-to-dictionary`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ lang, input: word }),
          }
        );

        const resJson = await res.json();

        queryClient.setQueryData([listDictionaryQueryKey, lang], (val: any) => {
          val.concat(res);
        });

        return resJson;
      }
    },
  });
};
