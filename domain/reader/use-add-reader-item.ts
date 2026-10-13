"use client";

import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddReaderItemParams, ReaderItem } from "./reader.types";

export const addReaderItem = async (
  params: AddReaderItemParams,
  opts: { Authorization: string },
): Promise<ReaderItem> => {
  const res = await fetch(`${siteConfig.contentApi}/v1/reader-items`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to save the text");
  }

  return resp;
};

export function useAddReaderItemMutation() {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AddReaderItemParams) => {
      return addReaderItem(params, { Authorization: authUser?.jwt });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-reader-items"] });
    },
  });
}
