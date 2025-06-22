"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { listMeaningQueryKey } from "../sentence/meaning.queries";

export type UpdateComponentSummaryParams = {
  id: string;
  summary: string;
};

const updateComponentSummary = async (
  options: UpdateComponentSummaryParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/update-summary`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateComponentSummaryMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: UpdateComponentSummaryParams) => {
      const response = await updateComponentSummary(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries([
        listMeaningQueryKey,
        data?.sentenceId,
        data?.lang,
      ] as any);
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
