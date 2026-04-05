"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

export const listHistoryQueryId = "list-history";
export const getHistoryQueryId = "get-history";

interface HistoryItem {
  createdAt: number;
  eventType: "SEARCH" | "CONTENT_VIEWED";
  id: string;
  input: string;
  lang: string;
  lastSeen: number;
  searchContextText?: string; // this keeps reference
  sk: string; // this helps us get that single search item
  timesSeen: { lastSeen: number }[];
  userId: string;
}

const historyItem: HistoryItem = {
  createdAt: 1775306208775,
  eventType: "SEARCH",
  id: "01KNC7XXG7Y717T9FQPN5BHKZK",
  input: "余年",
  lang: "zh",
  lastSeen: 1775306208775,
  searchContextText: "余年间",
  sk: "余年#zh#learnuidev@gmail.com",
  timesSeen: [{ lastSeen: 1775306208775 }],
  userId: "learnuidev@gmail.com",
};

type GetHistoryParams = {
  input: string;
  lang: string;
};

const getHistory = async (
  params: GetHistoryParams,
  opts: {
    Authorization: string;
  }
): Promise<HistoryItem> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-history`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useGetHistoryQuery(
  params: GetHistoryParams,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: [getHistoryQueryId, params.input, params.lang],
    queryFn: async () => {
      const response = await getHistory(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    enabled: Boolean(authUser?.jwt && params?.input && params.lang),
    ...options,
  });
}

const HistoryItem = {
  createdAt: 1775306208775,
  eventType: "SEARCH",
  id: "01KNC7XXG7Y717T9FQPN5BHKZK",
  input: "余年",
  lang: "zh",
  lastSeen: 1775306208775,
  searchContextText: "余年间",
  sk: "余年#zh#learnuidev@gmail.com",
  timesSeen: [{ lastSeen: 1775306208775 }],
  userId: "learnuidev@gmail.com",
};
export function useListHistoryQuery() {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: [listHistoryQueryId],
    queryFn: async () => {
      const res = await fetch(`${siteConfig.apiUrl}/v1/list-history`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      const resp = (await res.json()) as any;

      const sorted = {
        ...resp,
        Items: resp?.Items?.sort((a: any, b: any) => b?.lastSeen - a?.lastSeen),
      };

      return sorted;
    },
    enabled: Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
