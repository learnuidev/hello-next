"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { hskWords } from "@/langs/chinese /hsk";

// TODO: Move this to .env
const url = `${siteConfig?.apiUrl}/v1/list-hsk-words`;

async function listHSKWords(opts: { Authorization: string }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    // body: JSON.stringify({
    //   content: params?.content,
    // }),
  });
  const resp = (await res.json()) as any;
  return resp;
}

export function useListHSKWordsQuery(
  params = {} as { content: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listHSKWords, authUser?.jwt],
    async () => {
      if (!authUser?.jwt) {
        return hskWords;
      }
      // if (options.query) {
      const response = await listHSKWords({
        Authorization: authUser?.jwt,
      });

      // const uniqueHsks = [...new Set(response?.map((res: any) => res.hanzi))];

      // return uniqueHsks?.map((hsk) => {
      //   const hskItem = response?.find((item: any) => item?.hanzi === hsk);

      //   return hskItem;
      // });
      return response;
    },
    {
      ...options,
      // enabled: Boolean(authUser?.jwt),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
