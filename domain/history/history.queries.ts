"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

export const listHistoryQueryId = "list-history";
export function useListHistoryQuery() {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listHistoryQueryId],
    queryFn: async () => {
      const res = await fetch(`${siteConfig.apiUrl}/v1/list-history`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      const resp = (await res.json()) as any;

      return {
        ...resp,
        Items: resp?.Items?.sort(
          (a: any, b: any) => b?.createdAt - a?.createdAt
        ),
      };
    },
    enabled: Boolean(authUser?.jwt),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
