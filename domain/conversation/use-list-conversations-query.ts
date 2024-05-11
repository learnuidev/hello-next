"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";
import { Conversation } from "./conversation.type";

const listConversations = async (opts: { Authorization: string }) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-conversations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
  });
  const resp = (await res.json()) as any;

  return resp?.Items?.map((x: any) => {
    return {
      ...x,
      link: `/convos/${x.id}?type=conversation`,
    };
  }) as Conversation[];
};

export function useListConversationsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["list-conversations"],
    queryFn: async () => {
      const response = await listConversations({
        Authorization: authUser?.jwt,
      });
      return response?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
      // }
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    // enabled: Boolean(journeyId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
