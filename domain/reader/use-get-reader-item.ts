"use client";

import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ReaderItem } from "./reader.types";

const getReaderItem = async (
  readerItemId: string,
  opts: { Authorization: string },
): Promise<ReaderItem> => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/reader-items/${readerItemId}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to load the text");
  }

  return resp;
};

export function useGetReaderItemQuery(readerItemId: string) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ReaderItem>({
    queryKey: ["get-reader-item", readerItemId],
    queryFn: async () => {
      return getReaderItem(readerItemId, { Authorization: authUser?.jwt });
    },
    enabled: Boolean(authUser?.jwt) && Boolean(readerItemId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
