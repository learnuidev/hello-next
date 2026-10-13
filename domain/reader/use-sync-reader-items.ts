"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { addReaderItem } from "./use-add-reader-item";
import { AddReaderItemParams, ReaderItem } from "./reader.types";

/**
 * Pushes the texts left in the browser from the localStorage-era reader up to
 * the server, one by one. A failed item throws and stops the batch, so the
 * caller knows how far it got rather than silently dropping the rest.
 */
export function useSyncReaderItemsMutation() {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      items: AddReaderItemParams[],
    ): Promise<ReaderItem[]> => {
      const synced: ReaderItem[] = [];

      for (const item of items) {
        synced.push(
          await addReaderItem(item, { Authorization: authUser?.jwt }),
        );
      }

      return synced;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-reader-items"] });
    },
  });
}
