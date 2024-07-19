"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { hskWords } from "@/langs/chinese /hsk";
import { hsk2WordBank } from "@/langs/chinese /hsk-2";

// TODO: Move this to .env
// const url = `${siteConfig?.apiUrl}/v1/list-hsk-words`;
const url = `${siteConfig?.apiUrl}/v1/list-hsk-words/v3`;

async function listHSKWords(params: {}, opts: { Authorization: string }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      Authorization: `Bearer ${opts?.Authorization}`,
    },

    body: JSON.stringify(params),
    // body: JSON.stringify({
    //   content: params?.content,
    // }),
  });
  const resp = (await res.json()) as any;
  return resp;
  // return resp.map((x: any) => {
  //   return {
  //     ...x,
  //     hskLevel: x?.level,
  //   };
  // });
}

export function useListHSKWordsQuery(
  params = {} as { content: string; version?: number },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const version = params?.version || 3;

  return useQuery(
    [queryIds.listHSKWords, authUser?.jwt, version],
    async () => {
      if (!authUser?.jwt) {
        if (version === 2) {
          return hsk2WordBank;
        } else {
          return hskWords;
        }
      }
      // if (options.query) {
      const response = await listHSKWords(params, {
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
      enabled: Boolean(params?.version),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
