"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/parse";

async function parse(
  params: { content: string },
  opts: { Authorization: string }
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      hanzi: params?.content,
    }),
  });
  const resp = (await res.json()) as any;
  return resp;
}

export function useListParseQuery(
  params = {} as { content: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.parseQuery, params?.content],
    async () => {
      // if (options.query) {
      const response = await parse(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt) && Boolean(params?.content),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
