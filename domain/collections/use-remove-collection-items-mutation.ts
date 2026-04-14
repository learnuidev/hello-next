import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listCollectionsQueryKey } from "./use-list-collections-query";
import { collectionsByCharacterQueryKey } from "./use-list-collections-by-character-query";
import { collectionQueryIds } from "./queryIds";

const removeCollectionItems = async (
  params: { collectionId: string; itemIds: string[] },
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/collections/${params.collectionId}/remove-items`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemIds: params.itemIds }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to remove items");
  }

  return res.json();
};

export const useRemoveCollectionItemsMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { collectionId: string; itemIds: string[] }) => {
      const resp = await removeCollectionItems(params, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [listCollectionsQueryKey, authUser?.jwt],
      });
      queryClient.invalidateQueries({
        queryKey: [
          collectionQueryIds.getCollection,
          data?.collectionId,
          authUser?.jwt,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [collectionsByCharacterQueryKey],
      });
    },
  });
};
