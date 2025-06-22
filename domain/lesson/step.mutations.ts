"use client";
// import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { getComponentQueryKey } from "./use-get-component-query";
import { siteConfig } from "@/lib/config";

export type AddStepParams = {
  componentId: string;
};

const addSteps = async (
  options: AddStepParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-steps`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useAddStepsMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AddStepParams) => {
      const response = await addSteps(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries([getComponentQueryKey, data?.hanzi] as any);
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
