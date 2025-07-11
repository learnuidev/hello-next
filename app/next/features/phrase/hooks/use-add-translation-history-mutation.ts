import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";
import { listTranslationHistoryQueryKey } from "./use-list-translation-history";

export const useAddTranslationHistoryMutation = () => {
  const token = useJwtToken();

  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries([listTranslationHistoryQueryKey] as any);
    },
    mutationFn: async ({
      sourceLang,
      targetLang,
      title,
    }: {
      sourceLang: string;
      targetLang: string;
      title: string;
    }) => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/add-translation-history`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            sourceLang,
            targetLang,
            title,
          }),
        }
      );

      return res.json();
    },
  });
};
