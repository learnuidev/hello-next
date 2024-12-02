"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getContent, listContents } from "./content.api";

export function useListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listContents],
    async () => {
      const response = await listContents({
        Authorization: authUser?.jwt,
      });
      return response?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
      // }
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt),
      // enabled: Boolean(journeyId),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}

const getContentQueryId = "get-content";
export function useGetContentQuery(params: { contentId: string }) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [getContentQueryId, params.contentId],
    queryFn: async () => {
      const response = await getContent(params, {
        Authorization: authUser?.jwt,
      });
      return {
        ...response,
        transcriptions: response?.transcriptions?.map((transcription: any) => {
          if (!transcription?.start) {
            return {
              ...transcription,
              start: 0,
              end: 0,
            };
          }
          return transcription;
        }),
      };
      // }
    },

    enabled: Boolean(authUser?.jwt) && Boolean(params?.contentId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
  });
}
