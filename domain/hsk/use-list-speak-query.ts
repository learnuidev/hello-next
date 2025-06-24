"use client";

import { useQuery } from "@tanstack/react-query";

async function listSpeak(params: {}) {
  const res = await fetch(`/api/list-speak`, {
    method: "POST",
    headers: {
      Authorization: ``,
    },

    body: JSON.stringify(params),
  });
  const resp = (await res.json()) as any;
  return resp;
}

export function useListSpeakQuery(
  params = {} as { content: string; version?: number },
  options = {} as any
) {
  return useQuery<any>({
    queryKey: ["s3/list-speak"],
    queryFn: async () => {
      const response = await listSpeak({ ...params });

      return response;
    },

    ...options,
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
