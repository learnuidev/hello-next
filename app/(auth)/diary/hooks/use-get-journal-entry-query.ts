"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JournalEntry } from "./journal-entry.types";

const getJournalEntryQueryKey = "get-journal-entry";

export const useGetJournalEntryQuery = (entryId: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();
  const queryKey = [getJournalEntryQueryKey, entryId, authUser?.jwt];

  const data = queryClient.getQueryData(queryKey) as JournalEntry;

  return useQuery<JournalEntry, Error>({
    queryKey,
    refetchInterval: data?.status === "PROCESSING" ? 2000 : false,
    queryFn: async () => {
      const journalEntriesResp = await fetch(
        `${siteConfig.apiUrl}/v1/get-journal-entry`,
        {
          method: "POST",

          body: JSON.stringify({
            entryId,
          }),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        }
      );

      return journalEntriesResp.json();
    },
  });
};
