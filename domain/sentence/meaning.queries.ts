"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { ListMeaningsResponse } from "./meanings.types";
import { siteConfig } from "@/lib/config";

export interface ListMeaningsParams {
  sentenceId?: string;
  content: string;
  lang: string;
}

const listMeanings = async (
  options: { sentenceId?: string; content: string; lang: string },
  opts: {
    Authorization: string;
  }
): Promise<ListMeaningsResponse> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-meanings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resp = (await res.json()) as ListMeaningsResponse;

  return resp;
};

export const listMeaningQueryKey = "list-meanings";

export function useListMeaningsQuery(
  params = {} as ListMeaningsParams,
  options = {} as any
) {
  const queryClient = useQueryClient();
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListMeaningsResponse, Error>({
    queryKey: [listMeaningQueryKey, params.content, params?.lang],

    queryFn: async () => {
      if (params.lang) {
        const response = (await listMeanings(params, {
          Authorization: authUser?.jwt,
        })) as ListMeaningsResponse;

        if (!response.meanings) {
          queryClient.refetchQueries({
            queryKey: [listMeaningQueryKey, params.content, params?.lang],
          });
        }
        return response as ListMeaningsResponse;
      }
    },

    ...options,
    retry: 2,
    enabled: Boolean(params.content) && Boolean(params.lang),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
