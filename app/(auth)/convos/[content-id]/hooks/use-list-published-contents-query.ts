import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const publicContentsQueryKey = `list-published-contents`;

const usePublishedContentsStore = createIndexDBStore({
  name: publicContentsQueryKey,
  handler: (set: any, get: any) => ({
    contents: null,
    setContents: (f: any) =>
      typeof f === "function"
        ? set({ contents: f(get().contents) })
        : set({ contents: f }),
  }),
});

export const useGetPublicContentsQueryKey = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return [publicContentsQueryKey, authUser?.jwt];
};

export const useListRemotePublishedContentsQuery = ({
  key,
}: {
  key?: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  const myQueryKey = useGetPublicContentsQueryKey();

  const setContents: any = usePublishedContentsStore(
    (state) => state.setContents
  );

  return useQuery<any>({
    queryKey: [publicContentsQueryKey, authUser?.jwt],
    queryFn: async () => {
      if (authUser?.jwt) {
        const resp = await fetch(`${siteConfig.apiUrl}/v1/list-contents`, {
          method: "POST",

          body: JSON.stringify({
            type: "public",
          }),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        });

        if (!resp.ok) {
          throw new Error(resp?.statusText);
        }

        const respJson = await resp.json();

        const response = {
          ...respJson,
          items: await Promise.all(
            respJson?.items?.map(async (item: any) => {
              if (item?.sourceUrl) {
                const transcriptions = await fetch(item?.sourceUrl);
                const transcriptionsJson = await transcriptions.json();
                return {
                  ...item,
                  transcriptions: transcriptionsJson.transcriptions,
                };
              }

              return item;
            })
          ),
        };

        setContents(response);

        return response;
      }
    },
    staleTime: 300000,
  });
};

export const useListPublishedContentsQuery = ({ key }: { key?: string }) => {
  const { data, isLoading } = useListRemotePublishedContentsQuery({ key });
  const contents: any = usePublishedContentsStore((state) => state.contents);

  return useMemo(() => {
    return { data: data || contents, isLoading: isLoading };
  }, [contents, data, isLoading]);
};
