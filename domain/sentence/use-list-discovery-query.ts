"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";

export interface ListDiscoveryParams {
  content: string;
  lang: string;
}

export interface ListDiscoveryResponse {
  id: string;
  pinyin: string;
  hanzi: string;
  input: string;
  lang: string;
  en: string;
  roman: string;
  explanation?: string;
  chinglish?: string;
}

const listDiscovery = async (
  options: { sentenceId?: string; content: string; lang: string },
  opts: {
    Authorization: string;
  }
): Promise<ListDiscoveryResponse> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-discovery`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resp = await res.json();

  return resp;
};

export const listDiscoveryQueryKey = "list-discovery";

export function useListDiscoveryQuery(
  params = {} as ListDiscoveryParams,
  options = {} as any
) {
  const queryClient = useQueryClient();
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListDiscoveryResponse, Error>({
    queryKey: [listDiscoveryQueryKey, params.content, params?.lang],

    queryFn: async (): Promise<ListDiscoveryResponse> => {
      const response = await listDiscovery(params, {
        Authorization: authUser?.jwt,
      });

      return response;
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

/**
 * The same lookup, as a mutation: it goes off when it is called and at no
 * other time.
 *
 * A query is the right shape for something the view always wants — the
 * meaning of the sentence on screen — because react-query keeps it in step by
 * itself. It is the wrong shape for a lookup that is asked for by hand: a
 * query keyed by the content runs the moment something mounts with that
 * content, and every new key runs again, whether or not anyone wanted it. The
 * reader's Translate button is a request, so it is a mutation.
 */
export function useListDiscoveryMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation<ListDiscoveryResponse, Error, ListDiscoveryParams>({
    mutationFn: (params: ListDiscoveryParams) =>
      listDiscovery(params, {
        Authorization: authUser?.jwt,
      }),

    ...options,
  });
}
