import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listContentCollectionsQueryKey } from "./use-list-content-collections-query";
import { contentCollectionQueryIds } from "./query-ids";
import { ContentCollection } from "./content-collections.types";

const updateContentCollection = async (
  params: { collectionId: string; title?: string; description?: string },
  opts: { Authorization: string },
): Promise<ContentCollection> => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/content-collections/${params.collectionId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: params.title,
        description: params.description,
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to update collection");
  }

  return res.json();
};

export const useUpdateContentCollectionMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      collectionId: string;
      title?: string;
      description?: string;
    }) => {
      const resp = await updateContentCollection(params, {
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
          data?.id,
          authUser?.jwt,
        ],
      });
    },
  });
};
