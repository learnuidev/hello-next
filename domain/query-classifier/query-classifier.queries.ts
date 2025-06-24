"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

export const classifyQuery = async (
  { query }: { query: string },
  opts: { Authorization: string }
) => {
  const res = await fetch(`/api/query-classifier`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      query,
    }),
  });
  const resp = (await res.json()) as any;

  return resp;
};

export const classifyQueryId = "classify-query";

export function useGetQueryClassifierQuery(
  { query }: { query: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any, any, any>({
    queryKey: [classifyQueryId, query],
    queryFn: async () => {
      //   if (authUser?.jwt) {
      const response = await classifyQuery(
        { query },
        {
          Authorization: authUser?.jwt,
        }
      );

      return response;
      //   }
    },

    ...options,
    retry: false,
    enabled: Boolean(authUser?.jwt) && Boolean(query),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
