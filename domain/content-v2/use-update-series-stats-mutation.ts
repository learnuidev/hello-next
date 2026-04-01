"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

export type UpdateSeriesStatsParams = {
  seriesId: string;
};

const updateSeriesStats = async (
  params: UpdateSeriesStatsParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/series/${params.seriesId}/update-stats`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
    },
  );
  const resp = await res.json();
  return resp;
};

export function useUpdateSeriesStatsMutation(
  options?: UseMutationOptions<any, Error, UpdateSeriesStatsParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation<any, Error, UpdateSeriesStatsParams>({
    mutationFn: async (params: UpdateSeriesStatsParams) => {
      const response = await updateSeriesStats(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
  });
}
