"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { chineseCharacters } from "@/langs/chinese /characters";

const listSuperComponents = async (
  { componentId }: { componentId: string },
  opts: {
    Authorization: string;
  }
) => {
  try {
    const res = await fetch(`${siteConfig.apiUrl}/v1/list-super-components`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts?.Authorization}`,
      },
      body: JSON.stringify({
        componentId,
      }),
    });
    let resp = (await res.json()) as any;

    resp = resp?.map((item: any) => {
      const char = chineseCharacters?.find(
        (comp) => comp?.hanzi === item?.hanzi
      );

      return {
        ...item,
        ...char,
      };
    });

    return resp;
  } catch (err) {
    let resp = chineseCharacters?.find(
      (comp) => comp?.hanzi === componentId
    )?.subComponents;

    return resp || [];
  }
};

export const listQueryComponentsQueryId = "list-super-components";

export function useListSuperComponentsQuery(
  params = {} as { componentId: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listQueryComponentsQueryId, params?.componentId],
    queryFn: async () => {
      const response = await listSuperComponents(params, {
        Authorization: authUser?.jwt,
      });

      return response?.sort((a: any, b: any) => a?.level - b?.level);
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
