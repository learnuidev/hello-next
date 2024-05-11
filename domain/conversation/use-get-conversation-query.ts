"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";
import { Conversation } from "./conversation.type";

const getConversation = async (
  { conversationId }: { conversationId: string },
  opts: { Authorization: string }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-conversation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },

    body: JSON.stringify({
      conversationId,
    }),
  });
  const resp = (await res.json()) as any;

  return resp as Conversation;
};

export function useGetConversationQuery(
  params: { conversationId: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["get-conversation", params.conversationId],
    queryFn: async () => {
      const response = await getConversation(params, {
        Authorization: authUser?.jwt,
      });
      return response as Conversation;
    },

    ...options,
    retry: false,
    enabled: Boolean(authUser?.jwt && params?.conversationId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
