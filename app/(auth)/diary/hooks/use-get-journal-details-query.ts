"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

export const getJournalDetailsQueryKey = "get-journal-details";

export interface JournalTranslation {
  en: string;
  hanzi: string;
  pinyin: string;
  sectionId: string;
}
interface JournalDetails {
  createdAt: number;
  translations: JournalTranslation[];
  userId: string;
  entryId: string;
}

export const useGetJournalDetailsQuery = (entryId: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<JournalDetails, Error>({
    queryKey: [getJournalDetailsQueryKey, entryId, authUser?.jwt],
    queryFn: async () => {
      const journalEntriesResp = await fetch(
        `${siteConfig.apiUrl}/v1/get-journal-details`,
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
