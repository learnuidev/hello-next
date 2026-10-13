"use client";

import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ReaderItem, UpdateReaderItemParams } from "./reader.types";

const updateReaderItem = async (
  params: UpdateReaderItemParams,
  opts: { Authorization: string },
): Promise<ReaderItem> => {
  const res = await fetch(`${siteConfig.contentApi}/v1/update-reader-item`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to update the text");
  }

  return resp;
};

export function useUpdateReaderItemMutation() {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateReaderItemParams) => {
      return updateReaderItem(params, { Authorization: authUser?.jwt });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["list-reader-items"] });
      queryClient.invalidateQueries({
        queryKey: ["get-reader-item", data.id],
      });
    },
  });
}
