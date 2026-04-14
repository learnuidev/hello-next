import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listCollectionsQueryKey } from "./use-list-collections-query";
import { collectionQueryIds } from "./queryIds";

const addCollectionItems = async (
  params: { collectionId: string; items: any[] },
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/collections/${params.collectionId}/items`,
    {
      method: "POST",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: params.items }),
    },
  );
  const resp = await res.json();
  return resp;
};

export const useAddCollectionItemsMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { collectionId: string; items: any[] }) => {
      const resp = await addCollectionItems(params, {
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
    },
  });
};
