"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { HistoryItem } from "./history.types";

type GetHistoryParams =
  | { input: string; lang: string }
  | {
      id: string;
    };

const getHistory = async (
  params: GetHistoryParams,
  opts: {
    Authorization: string;
  }
): Promise<HistoryItem | null> => {
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

export const getHistoryQueryId = "get-history";
export function useGetHistoryQuery(
  params: GetHistoryParams,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const queryParams =
    "id" in params
      ? { id: params.id }
      : { input: params.input, lang: params.lang };

  return useQuery<HistoryItem | null>({
    queryKey: [getHistoryQueryId, JSON.stringify(queryParams)],
    queryFn: async () => {
      const response = await getHistory(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    enabled: Boolean(
      authUser?.jwt &&
        ("id" in params ? params.id : params.input && params.lang)
    ),
    ...options,
  });
}
