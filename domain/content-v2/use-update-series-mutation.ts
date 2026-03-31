"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { Series } from "./series.types";
import { TopicType } from "../topic/topic.types";

export type UpdateSeriesParams = {
  id: string;
  title?: string;
  topicType?: TopicType;
  sourceId?: string;
  backgroundImageAssetId?: string;
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

export function useUpdateSeriesMutation(
  options?: UseMutationOptions<Series, Error, UpdateSeriesParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<Series, Error, UpdateSeriesParams>({
    mutationFn: async (params: UpdateSeriesParams) => {
      const response = await updateSeries(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["list-series"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-series-details", data?.id],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
