"use client";
import { siteConfig } from "@/lib/config";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

const listTonePairs = async () => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-tone-pairs`, {
    method: "POST",
  });
  const resp = await res.json();
  return resp;
};

export function useListTonePairsQuery(options: any) {
  return useQuery<any>({
    queryKey: [queryIds.listTonePairs],
    queryFn: async () => {
      // if (options.query) {
      const response = await listTonePairs();
      return response;
      // }
    },

    ...options,
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
