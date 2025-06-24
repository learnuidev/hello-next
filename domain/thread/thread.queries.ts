"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { Message } from "ai/react";

export interface IThread {
  messages: Message[];
  userId: string;
  createdAt: number;
  id: string;
  title: string;
  lang: string;
}

export interface ListThreadsSuccess {
  Items: IThread[];
}

const listThreads = async (opts: { Authorization: string }) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-threads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({}),
  });
  const resp = (await res.json()) as any;

  return resp as ListThreadsSuccess;
};

export const listThreadsQueryId = "list-threads";

export function useListThreadsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any, any, any>({
    queryId: [listThreadsQueryId],
    queryFn: async () => {
      if (authUser?.jwt) {
        const response = await listThreads({
          Authorization: authUser?.jwt,
        });
        return response as ListThreadsSuccess;
      }
    },

    ...options,
    retry: false,
    enabled: Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
