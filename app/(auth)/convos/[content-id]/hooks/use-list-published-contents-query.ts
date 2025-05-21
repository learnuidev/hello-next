import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { hasBeen } from "@/domain/lesson/utils/has-been";

const usePublishedContentsStore = createIndexDBStore({
  name: "mando/publishedContents",
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

export const useComponents = () => {
  const components: any = usePublishedContentsStore(
    (state) => state.components
  );
  const setComponents = usePublishedContentsStore(
    (state) => state.setComponents
  );
  const lastUpdated = usePublishedContentsStore((state) => state.lastUpdated);
  const setLastUpdated = usePublishedContentsStore(
    (state) => state.setLastUpdated
  );

  return { components, setComponents, lastUpdated, setLastUpdated };
};

export const publicContentsQueryKey = `list-published-contents`;
export const useListPublishedContentsQuery = ({ key }: { key?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  const { components, setComponents, lastUpdated, setLastUpdated } =
    useComponents();

  return useQuery({
    queryKey: [
      publicContentsQueryKey,
      authUser?.jwt,
      lastUpdated,
      JSON.stringify(components),
    ],
    queryFn: async () => {
      if (authUser?.jwt) {
        const hasBeen24Hours = hasBeen({ timestamp: lastUpdated || 0 });

        if (components && lastUpdated && !hasBeen24Hours) {
          return components as any;
        }

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

        setComponents(response);
        setLastUpdated();

        return response;
      }
    },
  });
};
