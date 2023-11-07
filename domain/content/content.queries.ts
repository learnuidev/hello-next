"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { listContents } from "./content.api";

export function useListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listContents],
    async () => {
      const response = await listContents({
        Authorization: authUser?.jwt,
      });
      return response?.sort((a: any, b: any) => a?.createdAt - b?.createdAt);
      // }
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt),
      // enabled: Boolean(journeyId),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
