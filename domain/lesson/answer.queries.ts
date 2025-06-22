"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

const listAnswers = async (
  options: { journeyId?: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-answers`, {
    method: "POST",
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      journeyId: options?.journeyId,
    }),
  });
  const resp = (await res.json()) as any;

  const engChars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const newData = resp
    // @ts-ignore
    ?.sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt))
    ?.map((curr: any, idx: number, ctx: any) => {
      const prevSet = [
        // @ts-ignore
        ...new Set(
          ctx
            ?.slice(0, idx)
            .map((x: any) => x?.hanzi)
            .join("")
        ),
        // @ts-ignore
      ].filter((x: string) => !engChars?.includes(x?.toLocaleLowerCase()));
      const currentPhrase = curr?.hanzi
        ?.split("")
        ?.filter((x: string) => !engChars?.includes(x?.toLocaleLowerCase()));

      const newCharacters = [
        // @ts-ignore
        ...new Set(
          currentPhrase
            ?.filter((phrase: any) => !prevSet?.includes(phrase))
            ?.join("")
        ),
      ];

      if (curr?.hanzi === "用于构建Web和原生交互界面的库") {
      }

      return {
        ...curr,
        newCharacters,
        new: newCharacters?.length,
        totalCharacters: prevSet?.concat(newCharacters),
        total: prevSet?.concat(newCharacters)?.length,
      };
    });

  return newData;
};

export function useListAnswersQuery(
  params = {} as { journeyId?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [queryIds.listAnswers, params?.journeyId],
    queryFn: async () => {
      // if (options.query) {
      const response = await listAnswers(params, {
        Authorization: authUser?.jwt,
      });
      return response?.sort((a: any, b: any) => a?.createdAt - b?.createdAt);
      // }
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    // enabled: Boolean(journeyId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    // refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  });
}
