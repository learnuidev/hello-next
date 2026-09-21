import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listContentCollectionsQueryKey } from "./use-list-content-collections-query";
import { contentCollectionQueryIds } from "./query-ids";

const removeContentCollectionItems = async (
  params: { collectionId: string; itemIds?: string[]; contentIds?: string[] },
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/content-collections/${params.collectionId}/remove-items`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemIds: params.itemIds,
        contentIds: params.contentIds,
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to remove item");
  }

  return res.json() as Promise<{
    collectionId: string;
    removedItemIds: string[];
    totalItems: number;
  }>;
};

export const useRemoveContentCollectionItemsMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      collectionId: string;
      itemIds?: string[];
      contentIds?: string[];
    }) => {
      const resp = await removeContentCollectionItems(params, {
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
