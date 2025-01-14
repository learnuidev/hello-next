"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useListChineseCharactersQuery } from "../hsk/list-chinese-characters-query";

const listSubComponents = async (
  { componentId }: { componentId: string },
  opts: {
    Authorization: string;
  },
  chineseCharacters: any
) => {
  try {
    const res = await fetch(`${siteConfig.apiUrl}/v1/list-sub-components`, {
      method: "POST",
      headers: {
        // 'Access-Control-Allow-Origin': "*",
        Authorization: `Bearer ${opts?.Authorization}`,
      },
      body: JSON.stringify({
        componentId,
      }),
    });
    let resp = (await res.json()) as any;

    if (!resp) {
      resp = chineseCharacters?.find(
        (comp: any) => comp?.hanzi === componentId
      )?.subComponents;
    }

    return resp;
  } catch (err) {
    let resp = chineseCharacters?.find(
      (comp: any) => comp?.hanzi === componentId
    )?.subComponents;

    return resp || [];
  }
};

export function useListSubComponentsQuery(
  params = {} as { componentId: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const { data: chineseCharacters } = useListChineseCharactersQuery();

  return useQuery(
    [queryIds.listSubComponents, params?.componentId],
    async () => {
      // if (options.query) {
      const response = await listSubComponents(
        params,
        {
          Authorization: authUser?.jwt,
        },
        chineseCharacters
      );

      return response?.sort((a: any, b: any) => a?.createdAt - b?.createdAt);
      // }
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt),
      // enabled: Boolean(journeyId),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
