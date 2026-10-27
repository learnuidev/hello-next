"use client";

import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

import { ListCompatiblesResponse } from "./compatibles.types";

async function listCompatibles(
  params: { characterId: string },
  opts: { Authorization: string },
): Promise<ListCompatiblesResponse> {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-compatibles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      characterId: params?.characterId,
    }),
  });

  const resp = (await res.json()) as ListCompatiblesResponse;

  return resp;
}

export function useListCompatiblesQuery(
  params = {} as { characterId: string },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [queryIds.listCompatibles, params?.characterId],
    queryFn: async (): Promise<ListCompatiblesResponse> => {
      return await listCompatibles(params, {
        Authorization: authUser?.jwt,
      });
    },
    ...options,
    enabled: Boolean(authUser?.jwt) && Boolean(params?.characterId),
    cacheTime: 1000 * 60 * 300,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
