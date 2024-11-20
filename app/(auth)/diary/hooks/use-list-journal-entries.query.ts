"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { JournalEntry } from "./journal-entry.types";

export const listJournalEntriesQueryKey = "list-journal-entries";

export const useListJournalEntriesQuery = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<JournalEntry[], Error>({
    queryKey: [listJournalEntriesQueryKey, authUser?.jwt],
    queryFn: async () => {
      const journalEntriesResp = await fetch(
        `${siteConfig.apiUrl}/v1/list-journal-entries`,
        {
          method: "POST",

          body: JSON.stringify({}),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        }
      );

      const entries = (await journalEntriesResp.json()) as JournalEntry[];

      return entries.sort((a, b) => b.createdAt - a.createdAt);
    },
  });
};
