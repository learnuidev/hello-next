"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { UpdateSourceParams, Source } from "./source.types";

const updateSource = async (
  params: UpdateSourceParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.contentApi}/v1/update-source`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateSourceMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateSourceParams) => {
      const response = await updateSource(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: Source) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }

      queryClient.invalidateQueries({
        queryKey: ["list-sources"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-source-details", data?.id],
      });
    },
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
