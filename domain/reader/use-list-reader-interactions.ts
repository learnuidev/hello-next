"use client";

import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ListReaderInteractionsResponse } from "./reader-interactions.types";

const listReaderInteractions = async (
  opts: { Authorization: string },
  readerItemId?: string,
): Promise<ListReaderInteractionsResponse> => {
  const query = readerItemId
    ? `?readerItemId=${encodeURIComponent(readerItemId)}`
    : "";

  const res = await fetch(
    `${siteConfig.contentApi}/v1/reader-interactions${query}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to list reader interactions");
  }

  return resp;
};

export function useListReaderInteractionsQuery(readerItemId?: string) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListReaderInteractionsResponse>({
    queryKey: ["list-reader-interactions", readerItemId],
    queryFn: async () => {
      return listReaderInteractions(
        { Authorization: authUser?.jwt },
        readerItemId,
      );
    },
    enabled: Boolean(authUser?.jwt),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
