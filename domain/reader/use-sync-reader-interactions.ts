"use client";

import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ReaderInteractionInput } from "./reader-interactions.types";

export const syncReaderInteractions = async (
  items: ReaderInteractionInput[],
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/reader-interactions/sync`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    },
  );

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to sync reader interactions");
  }

  return resp;
};

export function useSyncReaderInteractionsMutation() {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (items: ReaderInteractionInput[]) => {
      return syncReaderInteractions(items, { Authorization: authUser?.jwt });
    },
  });
}
