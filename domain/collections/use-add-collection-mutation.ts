import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listCollectionsQueryKey } from "./use-list-collections-query";

const addCollection = async (
  params: { title: string },
  opts: { Authorization: string },
) => {
  const res = await fetch(`${siteConfig.apiUrlV2}/v1/collections`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useAddCollectionMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { title: string }) => {
      const resp = await addCollection(params, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [listCollectionsQueryKey, authUser?.jwt],
      });
    },
  });
};
