"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
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

export function useAddSeriesMutation(
  options?: UseMutationOptions<Series, Error, AddSeriesParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<Series, Error, AddSeriesParams>({
    mutationFn: async (params: AddSeriesParams) => {
      const response = await addSeries(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["list-series"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
