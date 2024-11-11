"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

const listSentences = async (
  options: { component?: string; lang?: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-sentences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = (await res.json()) as any;

  return resp;
};

export const listSentencesQueryKey = "list-sentences";
export function useListSentencesQuery(
  params = {} as {
    component?: string;
    lang?: string;
    genSents?: boolean;
    contentLang?: string;
  },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [
      queryIds.list_sentences,
      params?.component,
      params?.lang,
      params?.genSents,
      params?.contentLang,
    ],
    async () => {
      // if (authUser?.jwt) {
      const response = await listSentences(params, {
        Authorization: authUser?.jwt,
      });
      return response?.sort((a: any, b: any) => a?.start - b?.start);
      // }
    },
    {
      ...options,
      retry: false,
      // enabled: Boolean(authUser?.jwt),
      // cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
