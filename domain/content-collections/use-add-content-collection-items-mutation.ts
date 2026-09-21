import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listContentCollectionsQueryKey } from "./use-list-content-collections-query";
import { contentCollectionQueryIds } from "./query-ids";
import { ContentToCollect } from "./content-collections.types";

const addContentCollectionItems = async (
  params: { collectionId: string; items: ContentToCollect[] },
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/content-collections/${params.collectionId}/items`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: params.items }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to add item");
  }

  return res.json() as Promise<{
    collectionId: string;
    addedItems: any[];
    skippedContentIds: string[];
    totalItems: number;
  }>;
};

export const useAddContentCollectionItemsMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      collectionId: string;
      items: ContentToCollect[];
    }) => {
      const resp = await addContentCollectionItems(params, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [listContentCollectionsQueryKey, authUser?.jwt],
      });
      queryClient.invalidateQueries({
        queryKey: [
          contentCollectionQueryIds.getContentCollection,
          data?.collectionId,
          authUser?.jwt,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [contentCollectionQueryIds.contentCollectionsByContent],
      });
    },
  });
};
