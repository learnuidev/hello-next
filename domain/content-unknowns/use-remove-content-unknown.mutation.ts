import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { listContentUnknownsQueryKey } from "./use-list-content-unknowns.query";
import { RemoveContentUnknownRequest } from "./content-unknowns.types";

const removeContentUnknown = async (
  params: RemoveContentUnknownRequest,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/remove-unknown`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  await res.json();
  return params;
};

export const useRemoveContentUnknownMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: any) => {
      const resp = await removeContentUnknown(params, {
        Authorization: authUser?.jwt,
      });

      return resp;
    },

    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [listContentUnknownsQueryKey, authUser?.jwt, data.contentId],
      });
    },
  });
};
