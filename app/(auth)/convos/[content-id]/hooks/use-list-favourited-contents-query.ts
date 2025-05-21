import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { createIndexDBStore } from "@/libs/index-db/index-db";
import { hasBeen } from "@/domain/lesson/utils/has-been";

const useListContentsStore = createIndexDBStore({
  name: "mando/favourited-contents",
  handler: (set: any, get: any) => ({
    lastUpdated: null,
    setLastUpdated: (val?: any) =>
      set({ lastUpdated: val !== undefined ? val : Date.now() }),
    components: null,
    setComponents: (f: any) =>
      typeof f === "function"
        ? set({ components: f(get().components) })
        : set({ components: f }),
  }),
});

export const useFavouriteContents = () => {
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

const favouriteContentsQueryKey = `list-favourite-contents`;

export const useGetFavouritesContentsKey = () => {
  const { data: authUser } = useCurrentAuthUser({});

  const { components, setComponents, lastUpdated, setLastUpdated } =
    useFavouriteContents();
  return [
    favouriteContentsQueryKey,
    authUser?.jwt,
    lastUpdated,
    JSON.stringify(components),
  ];
};
export const useListFavouriteContentsQuery = ({ key }: { key?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  const { components, setComponents, lastUpdated, setLastUpdated } =
    useFavouriteContents();

  const queryKey = useGetFavouritesContentsKey();

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (authUser?.jwt) {
        if (components && lastUpdated && !hasBeen({ timestamp: lastUpdated })) {
          return components as any;
        }

        const resp = await fetch(`${siteConfig.apiUrl}/v1/list-contents`, {
          method: "POST",

          body: JSON.stringify({
            type: "favourite",
          }),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        });

        if (!resp.ok) {
          throw new Error(resp?.statusText);
        }

        const respJson = await resp.json();
        const finalResponse = {
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

        setComponents(finalResponse);
        setLastUpdated();

        return finalResponse;
      }
    },
  });
};
