import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { contentCollectionQueryIds } from "./query-ids";
import { ContentCollection } from "./content-collections.types";

const listContentCollections = async (opts: {
  Authorization: string;
  key?: string;
}): Promise<{ items: ContentCollection[]; lastEvaluatedKey: any }> => {
  const url = opts.key
    ? `${siteConfig.apiUrlV2}/v1/content-collections?key=${encodeURIComponent(
        JSON.stringify(opts.key),
      )}`
    : `${siteConfig.apiUrlV2}/v1/content-collections`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as any)?.message || "Failed to fetch content collections",
    );
  }

  return res.json();
};

export const listContentCollectionsQueryKey =
  contentCollectionQueryIds.listContentCollections;

export const useListContentCollectionsQuery = (options = {} as any) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listContentCollectionsQueryKey, authUser?.jwt],
    enabled: !!authUser?.jwt,
    queryFn: async () => {
      const resp = await listContentCollections({
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    ...options,
  });
};
