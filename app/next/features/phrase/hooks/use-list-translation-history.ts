import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

export const listTranslationHistoryQueryKey = "list-translation-history";
export const useListTranslationHistory = () => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [listTranslationHistoryQueryKey],
    queryFn: async () => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/list-translation-history`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resJson = await res.json();

      return resJson?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
    },
  });
};
