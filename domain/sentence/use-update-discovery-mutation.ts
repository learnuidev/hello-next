"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import {
  listDiscoveryQueryKey,
  ListDiscoveryResponse,
} from "./use-list-discovery-query";

import { siteConfig } from "@/lib/config";

export type UpdateDiscoveryResponse = ListDiscoveryResponse & {
  updatedAt: string;
};

export type UpdateDiscoveryParams = any;

export const updateDiscoveryApi = async (
  params: any,
  opts: {
    Authorization: string;
  }
): Promise<UpdateDiscoveryResponse> => {
  const { id, ...rest } = params;
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-discovery`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      id,
      ...rest,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resp = (await res.json()) as UpdateDiscoveryResponse;

  return resp;
};

export function useUpdateDiscoveryMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: any) => {
      const response = await updateDiscoveryApi(params, {
        Authorization: authUser?.jwt,
      });

      return response as UpdateDiscoveryResponse;
    },
    onSuccess: (data: UpdateDiscoveryResponse) => {
      queryClient.refetchQueries({
        queryKey: [listDiscoveryQueryKey, data.input, data.lang],
      });
    },
    ...options,
  });
}
