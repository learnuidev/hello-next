"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useListCharactersQuery } from "../lesson/character.queries";
import { useListComponents } from "../lesson/component.queries";

const listSuperComponents = async (
  { componentId }: { componentId: string },
  opts: {
    Authorization: string;
  }
) => {
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

  // resp = resp?.map((item: any) => {
  //   const char = chineseCharacters?.find((comp) => comp?.hanzi === item?.hanzi);

  //   return {
  //     ...item,
  //     ...char,
  //   };
  // });

  return resp;
};

export const listQueryComponentsQueryId = "list-super-components";

export function useListSuperComponentsQuery(
  params = {} as { componentId: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const { data: chineseCharacters } = useListComponents();

  return useQuery<any>({
    queryKey: [
      listQueryComponentsQueryId,
      params?.componentId,
      JSON.stringify(chineseCharacters),
    ],
    queryFn: async () => {
      const response = await listSuperComponents(params, {
        Authorization: authUser?.jwt,
      });

      let resp;

      resp = response?.map((item: any) => {
        const char = chineseCharacters?.find(
          (comp: any) => comp?.hanzi === item?.hanzi
        );

        return {
          ...item,
          ...char,
        };
      });

      return resp.sort((a: any, b: any) => a?.level - b?.level) as any;
    },
    ...options,
    enabled: Boolean(authUser?.jwt) && params?.componentId?.length === 1,
    // enabled: Boolean(journeyId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
