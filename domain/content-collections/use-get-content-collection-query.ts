import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { contentCollectionQueryIds } from "./query-ids";
import { ContentCollectionWithItems } from "./content-collections.types";

const getContentCollection = async (
  collectionId: string,
  opts: { Authorization: string },
): Promise<ContentCollectionWithItems> => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/content-collections/${collectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to fetch collection");
  }

  return res.json();
};

export const useGetContentCollectionQuery = (
  params: { collectionId: string },
  options = {} as any,
) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [
      contentCollectionQueryIds.getContentCollection,
      params.collectionId,
      authUser?.jwt,
    ],
    enabled: !!authUser?.jwt && !!params.collectionId,
    queryFn: async () => {
      const resp = await getContentCollection(params.collectionId, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    ...options,
  });
};
