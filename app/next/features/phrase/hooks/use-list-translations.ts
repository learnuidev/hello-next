import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

export const listTranslationsQueryKey = "list-translations";
export const useListTranslations = (contextId: string) => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [listTranslationsQueryKey, contextId],
    queryFn: async () => {
      const res = await fetch(`${siteConfig.apiUrlV2}/v1/list-translations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contextId }),
      });

      const resJson = (await res.json()) as any;

      return resJson?.sort((a: any, b: any) => a?.createdAt - b?.createdAt);
    },
  });
};

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}
