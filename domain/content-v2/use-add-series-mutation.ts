"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { AddSeriesParams, Series } from "./series.types";

const addSeries = async (
  params: AddSeriesParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.contentApi}/v1/add-series`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useAddSeriesMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AddSeriesParams) => {
      const response = await addSeries(params, {
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
    },
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
