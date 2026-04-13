"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

interface Synonym {
  hanzi: string;
  pinyin: string;
  en: string;
}

async function listSynonyms(
  params: { characterId: string },
  opts: { Authorization: string },
): Promise<Synonym[]> {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-synonyms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      characterId: params?.characterId,
    }),
  });
  const resp = (await res.json()) as any;
  return resp;
}

export function useListSynonymsQuery(
  params = {} as { characterId: string },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [queryIds.listSynonyms, params?.characterId],
    queryFn: async () => {
      const response = await listSynonyms(params, {
        Authorization: authUser?.jwt,
      });

      return response;
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
