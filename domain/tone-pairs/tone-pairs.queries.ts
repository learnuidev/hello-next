"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-tone-pairs";

const listTonePairs = async () => {
  const res = await fetch(url, {
    method: "POST",
  });
  const resp = await res.json();
  return resp;
};

export function useListTonePairsQuery(options: any) {
  return useQuery(
    [queryIds.listTonePairs],
    async () => {
      // if (options.query) {
      const response = await listTonePairs();
      return response;
      // }
    },
    {
      ...options,
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
