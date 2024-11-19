"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JournalEntry } from "./journal-entry.types";
import { listJournalEntriesQueryKey } from "./use-list-journal-entries.query";

export const useDeleteJournalEntryMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const audioResp = await fetch(
        `${siteConfig.apiUrl}/v1/delete-journal-entry`,
        {
          method: "POST",

          body: JSON.stringify(params),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        }
      );

      return audioResp.json();
    },

    onSuccess: (data: JournalEntry) => {
      console.log("DELETED", data);
      queryClient.setQueryData(
        [listJournalEntriesQueryKey, authUser?.jwt],
        (old: any) => {
          return old?.filter((item: any) => item.id !== data.id);
        }
      );
    },
  });
};
