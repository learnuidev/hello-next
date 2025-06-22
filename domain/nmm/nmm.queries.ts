"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import posthog from "posthog-js";
import { siteConfig } from "@/lib/config";

// TODO: Move this to .env

async function parse(
  params: { content: string },
  opts: { Authorization: string }
) {
  const res = await fetch(`${siteConfig.apiUrl}/v1/parse`, {
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
  const startTime = Date.now();
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [queryIds.parseQuery, params?.content],
    queryFn: async () => {
      // if (options.query) {
      const response = await parse(params, {
        Authorization: authUser?.jwt,
      });

      const endTime = Date.now();
      const latency = endTime - startTime;

      posthog.capture("search/latency", {
        query: params?.content,
        start_time: startTime,
        end_time: endTime,
        latency: latency,
      });
      return response;
    },

    ...options,
    enabled: Boolean(authUser?.jwt) && Boolean(params?.content),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
