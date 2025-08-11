"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useListChineseCharactersQuery } from "../hsk/list-chinese-characters-query";

interface ListSubComponentsQuery {
  componentId: string;
  lang: string;
}

interface SubComponentsResponse {
  id: string;
  subComponents: { hanzi: string; en: string }[];
}
const listSubComponents = async (
  { componentId, lang }: ListSubComponentsQuery,
  opts: {
    Authorization: string;
  },
  chineseCharacters: any
): Promise<SubComponentsResponse> => {
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

  if (!res.ok) {
    throw new Error("Not found");
  }
  let resp = (await res.json()) as any;
  return resp;
};

export function useListSubComponentsQuery(
  params = {} as ListSubComponentsQuery,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const { data: chineseCharacters } = useListChineseCharactersQuery();

  return useQuery<any>({
    queryKey: [queryIds.listSubComponents, params?.componentId],
    queryFn: async () => {
      // if (options.query) {
      const response = await listSubComponents(
        params,
        {
          Authorization: authUser?.jwt,
        },
        chineseCharacters
      );

      return response?.subComponents.sort(
        (a: any, b: any) => a?.createdAt - b?.createdAt
      );
      // }
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    // enabled: Boolean(journeyId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
