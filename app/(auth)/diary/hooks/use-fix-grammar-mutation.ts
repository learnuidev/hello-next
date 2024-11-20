"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFixGrammarMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { text: string }) => {
      const audioResp = await fetch(`${siteConfig.apiUrl}/v1/fix-grammar`, {
        method: "POST",

        body: JSON.stringify(params),

        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      return audioResp.json();
    },
  });
};
