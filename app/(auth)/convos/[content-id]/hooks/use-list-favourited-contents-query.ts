import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

const favouriteContentsQueryKey = `list-favourite-contents`;

export const useGetFavouritesContentsKey = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return [favouriteContentsQueryKey, authUser?.jwt];
};
export const useListFavouriteContentsQuery = ({ key }: { key?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  const queryKey = useGetFavouritesContentsKey();

  return useQuery<any>({
    queryKey,
    queryFn: async () => {
      if (authUser?.jwt) {
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

        // setComponents(finalResponse);
        // setLastUpdated();

        return finalResponse;
      }
    },
  });
};
