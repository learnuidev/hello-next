"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getContent, IContent, listContents } from "./content.api";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useListContentsStore = createIndexDBStore({
  name: "mando/public-contents-2",
  handler: (set: any, get: any) => ({
    lastUpdated: null,
    setLastUpdated: () => set({ lastUpdated: Date.now() }),
    components: null,
    setComponents: (f: any) =>
      typeof f === "function"
        ? set({ components: f(get().components) })
        : set({ components: f }),
  }),
});

interface Content {
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
}
type ListContentsResponse = {
  items: Content[];
};

const listContentsRecursive = async (
  jwt: string,
  key?: string,
  res = []
): Promise<ListContentsResponse> => {
  const resp = await listContents({ key }, { Authorization: jwt });

  if (resp?.lastEvaulatedKey) {
    return listContentsRecursive(
      jwt,
      resp?.lastEvaulatedKey,
      res.concat(resp?.items)
    );
  }

  return {
    items: res,
  };
};

export const listContentsQueryKey = "list-my-contents";

export const useGetListContentsQueryKey = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return [listContentsQueryKey, authUser?.jwt];
};
export function useListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  const queryKey = useGetListContentsQueryKey();

  return useQuery<ListContentsResponse, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await listContentsRecursive(authUser?.jwt);

      const finalResponse = {
        ...response,
        items: response?.items?.sort(
          (a: any, b: any) => b?.createdAt - a?.createdAt
        ),
      };

      return finalResponse;
      // return response?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
      // }
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    // enabled: Boolean(journeyId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
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
      return response;
    },
    retry: false,
    // @ts-ignore
    onSuccess: (data: IContent) => {
      opts?.onSuccess?.(data);
      queryClient.setQueryData([listContentsQueryKey, true], (old: any) => {
        return {
          ...old,
          items: (old?.items || []).map((content: any) => {
            if (content?.id === data?.id) {
              return data;
            }
            return content;
          }),
        };
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
