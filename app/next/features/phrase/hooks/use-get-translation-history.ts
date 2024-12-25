import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

const getTranslationHistoryQueryKey = "get-translation-history";
export const useGetTranslationHistory = (id: string) => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [getTranslationHistoryQueryKey, id],
    queryFn: async () => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/get-translation-history`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ id }),
        }
      );

      const resJson = await res.json();

      return resJson;
    },
  });
};
