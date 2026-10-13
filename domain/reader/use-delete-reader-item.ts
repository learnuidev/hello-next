"use client";

import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

const deleteReaderItem = async (
  readerItemId: string,
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/reader-items/${readerItemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to delete the text");
  }

  return resp;
};

export function useDeleteReaderItemMutation() {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (readerItemId: string) => {
      return deleteReaderItem(readerItemId, { Authorization: authUser?.jwt });
    },
    onSuccess: (_data, readerItemId) => {
      queryClient.invalidateQueries({ queryKey: ["list-reader-items"] });
      queryClient.removeQueries({ queryKey: ["get-reader-item", readerItemId] });
    },
  });
}
