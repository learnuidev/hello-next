"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

export type PortEpisodesParams = {
  seriesId: string;
  contentIds: string[];
};

const portEpisodes = async (
  params: PortEpisodesParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/series/${params.seriesId}/port-episodes`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentIds: params.contentIds,
      }),
    },
  );
  const resp = await res.json();
  return resp;
};

export function usePortEpisodesMutation(
  options?: UseMutationOptions<any, Error, PortEpisodesParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<any, Error, PortEpisodesParams>({
    mutationFn: async (params: PortEpisodesParams) => {
      const response = await portEpisodes(params, {
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
