import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
// import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

export const listDictionaryQueryKey = "list-dictionary";
export const useListDictionaryQuery = (lang: string) => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [listDictionaryQueryKey, lang],
    queryFn: async () => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/dictionary/list-dictionary`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ lang }),
        }
      );

      const resJson = await res.json();

      return resJson?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
    },
  });
};
