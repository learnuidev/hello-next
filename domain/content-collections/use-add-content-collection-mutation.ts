import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listContentCollectionsQueryKey } from "./use-list-content-collections-query";
import { ContentCollection } from "./content-collections.types";

const addContentCollection = async (
  params: { title: string; description?: string },
  opts: { Authorization: string },
): Promise<ContentCollection> => {
  const res = await fetch(`${siteConfig.apiUrlV2}/v1/content-collections`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to create collection");
  }

  return res.json();
};

export const useAddContentCollectionMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { title: string; description?: string }) => {
      const resp = await addContentCollection(params, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [listContentCollectionsQueryKey, authUser?.jwt],
      });
    },
  });
};
