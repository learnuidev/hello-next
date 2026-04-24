"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

export type UpdateEpisodeOrderParams = {
  seriesId: string;
  episodeOrders: Array<{
    episodeId: string;
    sortOrder: number;
  }>;
};

const updateEpisodeOrder = async (
  params: UpdateEpisodeOrderParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/series/${params.seriesId}/episode-order`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        episodeOrders: params.episodeOrders,
      }),
    },
  );
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to update episode order: ${res.statusText}`,
    );
  }
  
  const resp = await res.json();
  return resp;
};

export function useUpdateEpisodeOrderMutation(
  options?: UseMutationOptions<any, Error, UpdateEpisodeOrderParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateEpisodeOrderParams>({
    mutationFn: async (params: UpdateEpisodeOrderParams) => {
      const response = await updateEpisodeOrder(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["list-series"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-series-details", variables.seriesId],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
