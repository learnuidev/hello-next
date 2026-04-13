"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

interface Antonym {
  hanzi: string;
  pinyin: string;
  en: string;
}

async function listAntonyms(
  params: { characterId: string },
  opts: { Authorization: string },
): Promise<Antonym[]> {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-antonyms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      characterId: params?.characterId,
    }),
  });
  const resp = await res.json();
  return resp as Antonym[];
}

export function useListAntonymsQuery(
  params = {} as { characterId: string },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [queryIds.listAntonyms, params?.characterId],
    queryFn: async (): Promise<Antonym[]> => {
      const response = await listAntonyms(params, {
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
