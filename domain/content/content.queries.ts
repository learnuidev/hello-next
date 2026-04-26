"use client";

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getContent, IContent, listContents } from "./content.api";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useContentsStore = createIndexDBStore({
  name: "list-content-v3",
  handler: (set: any, get: any) => ({
    contents: null,
    setContents: (f: any) =>
      typeof f === "function"
        ? set({ contents: f(get().contents) })
        : set({ contents: f }),
  }),
});

export interface Content {
  id: string;
  sourceUrl?: string;
  uploadBucketKey?: string;
  backgroundImageId?: string;
  backgroundImageUrl?: string;
  coverPhotoId?: string;
  coverPhotoUrl?: string;
  title: string;
  userId: string;

  transcriptions: {
    input: string;
    roman: string;
    lit: string;
    hanzi?: string;
    pinyin?: string;
    id?: string;
    en?: string;
  }[];
  chapters: {
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
  lastEvaulatedKey?: {
    id: string;
    userId: string;
  };
  lastEvaluatedKey?: {
    id: string;
    userId: string;
  };
};

export const listContentsQueryKey = "list-my-contents";

export const useGetListContentsQueryKey = (contentIds?: string[]) => {
  const { data: authUser } = useCurrentAuthUser({});

  return [
    listContentsQueryKey,
    authUser?.jwt,
    contentIds ? JSON.stringify(contentIds) : null,
  ].filter(Boolean);
};
export function useListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  const queryKey = useGetListContentsQueryKey(options?.contentIds);

  return useQuery<ListContentsResponse, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await listContents({
        contentIds: options?.contentIds,
      });

      const finalResponse = {
        ...response,
        items: response?.items?.sort(
          (a: any, b: any) => b?.createdAt - a?.createdAt,
        ),
      };

      // setContents(finalResponse);

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

export function useInfiniteListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useInfiniteQuery<ListContentsResponse, Error>({
    queryKey: [listContentsQueryKey, authUser?.jwt, "infinite"],
    queryFn: async ({ pageParam }) => {
      const response = await listContents({ key: pageParam });

      const finalResponse = {
        ...response,
        items: response?.items?.sort(
          (a: any, b: any) => b?.createdAt - a?.createdAt,
        ),
      };

      return finalResponse;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return (
        lastPage?.lastEvaulatedKey || lastPage?.lastEvaluatedKey || undefined
      );
    },
    ...options,
    enabled: Boolean(authUser?.jwt),
    cacheTime: 1000 * 60 * 300,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export const getContentQueryId = "get-content";
export function useGetContentQuery(
  params: { contentId: string },
  opts = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  const setContents: any = useContentsStore((state) => state.setContents);

  const queryClient = useQueryClient();

  return useQuery<IContent, any, any>({
    // @ts-ignore
    queryKey: [getContentQueryId, params.contentId],
    queryFn: async () => {
      const response = await getContent(params, {
        Authorization: authUser?.jwt,
      });

      const updatedResponse = {
        ...response,
        transcriptions: response?.transcriptions?.map(
          (transcriptionItem, idx: number, ctx) => {
            if (idx === 0) {
              return {
                ...transcriptionItem,
                start: transcriptionItem?.start,
                end: transcriptionItem?.end || ctx?.[idx + 1]?.start,
              };
            }

            return transcriptionItem;
          },
        ),
      };

      setContents((prevContent: any) => {
        const updatedItems = (prevContent?.items || [])
          ?.filter((c: any) => c?.id !== updatedResponse?.id)
          .concat(updatedResponse);

        return {
          ...prevContent,
          items: updatedItems,
        };
      });
      return updatedResponse;
    },
    ...opts,

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
