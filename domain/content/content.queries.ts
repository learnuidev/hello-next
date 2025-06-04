"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getContent, listContents } from "./content.api";

import { hasBeen } from "@/domain/lesson/utils/has-been";
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

export const useContentsStore = () => {
  const components: any = useListContentsStore(
    (state: any) => state.components
  );
  const setComponents = useListContentsStore(
    (state: any) => state.setComponents
  );
  const lastUpdated = useListContentsStore((state: any) => state.lastUpdated);
  const setLastUpdated = useListContentsStore(
    (state: any) => state.setLastUpdated
  );

  return { components, setComponents, lastUpdated, setLastUpdated };
};

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

  const { components, setComponents, lastUpdated, setLastUpdated } =
    useContentsStore();

  return [
    listContentsQueryKey,
    listContentsQueryKey,
    lastUpdated,
    JSON.stringify(components),
  ];
};
export function useListContentsQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  const { components, setComponents, lastUpdated, setLastUpdated } =
    useContentsStore();

  const queryKey = useGetListContentsQueryKey();

  return useQuery<ListContentsResponse, Error>(
    queryKey,
    async () => {
      if (
        components &&
        lastUpdated &&
        !hasBeen({ timestamp: lastUpdated }) &&
        !options?.forceReload
      ) {
        return components as ListContentsResponse;
      }

      const response = await listContentsRecursive(authUser?.jwt);

      const finalResponse = {
        ...response,
        items: response?.items?.sort(
          (a: any, b: any) => b?.createdAt - a?.createdAt
        ),
      };

      setComponents(finalResponse);
      setLastUpdated();

      return finalResponse;
      // return response?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
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
    retry: false,
    onSuccess: (data) => {
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
