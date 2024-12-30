import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";
import { listTranslationsQueryKey } from "./use-list-translations";

export const useDeleteTranslationMutation = (contextId: string) => {
  const token = useJwtToken();

  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries([listTranslationsQueryKey, contextId]);
    },
    mutationFn: async (props: { id: string }) => {
      const res = await fetch(`${siteConfig.apiUrlV2}/v1/delete-translation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: props.id, contextId }),
      });

      return res.json();
    },
  });
};
