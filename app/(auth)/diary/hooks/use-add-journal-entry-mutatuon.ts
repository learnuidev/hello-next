"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JournalEntry } from "./journal-entry.types";
import { listJournalEntriesQueryKey } from "./use-list-journal-entries.query";

export const useAddJournalEntryMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { text: string }) => {
      const audioResp = await fetch(
        `${siteConfig.apiUrl}/v1/add-journal-entry`,
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
      queryClient.setQueryData(
        [listJournalEntriesQueryKey, authUser?.jwt],
        (old: any) => {
          return [data, ...old];
        }
      );
    },
  });
};
