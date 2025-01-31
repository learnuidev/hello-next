"use client";
import { queryIds } from "./queryIds";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getContent, listContents } from "./content.api";

type ListContentsResponse = {
  id: string;
  sourceUrl?: string;
  uploadBucketKey?: string;
  title: string;
  transcriptions: {
    input: string;
    roman: string;
    lit: string;
    hanzi?: string;
    pinyin?: string;
    id?: string;
    en?: string;
  }[];
}[];

export function useListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListContentsResponse, Error>(
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

export const getContentQueryId = "get-content";
export function useGetContentQuery(
  params: { contentId: string },
  opts = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();

  return useQuery({
    // @ts-ignore
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
    onSuccess: (data) => {
      console.log("LOADED", data);
      console.log("OPTIONS", opts);
      opts?.onSuccess?.(data);
      queryClient.setQueryData([queryIds.listContents], (old: any) => {
        return (old || []).map((content: any) => {
          if (content?.id === data?.id) {
            return data;
          }
          return content;
        });
      });
    },

    enabled: Boolean(authUser?.jwt) && Boolean(params?.contentId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,

    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
