"use client";

import { useQuery } from "@tanstack/react-query";

async function listChineseCharacters(params: {}) {
  const res = await fetch(`/api/list-chinese-characters`, {
    method: "POST",
    headers: {
      Authorization: ``,
    },

    body: JSON.stringify(params),
  });
  const resp = (await res.json()) as any;
  return resp;
}

export function useListChineseCharactersQuery(
  params = {} as { content: string; version?: number },
  options = {} as any
) {
  return useQuery({
    queryKey: ["s3/list-chinese-characters"],
    queryFn: async () => {
      const response = await listChineseCharacters({ ...params });

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
