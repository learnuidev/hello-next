"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { Series } from "./series.types";

type UpdateSeriesParams = {
  id: string;
  title?: string;
  topicType?: string;
  source?: any;
  backgroundImage?: string;
  stats?: any;
};

const updateSeries = async (
  params: UpdateSeriesParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.contentApi}/v1/update-series`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateSeriesMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateSeriesParams) => {
      const response = await updateSeries(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: Series) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }

      queryClient.invalidateQueries({
        queryKey: ["list-series"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-series-details", data?.id],
      });
    },
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
