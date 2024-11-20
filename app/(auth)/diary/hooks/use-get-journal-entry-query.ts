"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { JournalEntry } from "./journal-entry.types";

export const getJournalEntryQueryKey = "get-journal-entry";

export const useGetJournalEntryQuery = (entryId: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<JournalEntry, Error>({
    queryKey: [getJournalEntryQueryKey, entryId, authUser?.jwt],
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
