import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listCollectionsQueryKey } from "./use-list-collections-query";
import { collectionQueryIds } from "./queryIds";

const updateCollection = async (
  params: { collectionId: string; title: string },
  opts: { Authorization: string },
) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/collections/${params.collectionId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `${opts?.Authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: params.title }),
    },
  );
  const resp = await res.json();
  return resp;
};

export const useUpdateCollectionMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { collectionId: string; title: string }) => {
      const resp = await updateCollection(params, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [listCollectionsQueryKey, authUser?.jwt],
      });
      queryClient.invalidateQueries({
        queryKey: [collectionQueryIds.getCollection, data?.id, authUser?.jwt],
      });
    },
  });
};
