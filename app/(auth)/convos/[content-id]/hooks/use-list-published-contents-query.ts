import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

const publicContentsQueryKey = `list-published-contents`;

export const useGetPublicContentsQueryKey = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return [publicContentsQueryKey, authUser?.jwt];
};

export const useListPublishedContentsQuery = ({ key }: { key?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  const myQueryKey = useGetPublicContentsQueryKey();

  return useQuery({
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

        return response;
      }
    },
    staleTime: 300000,
  });
};
