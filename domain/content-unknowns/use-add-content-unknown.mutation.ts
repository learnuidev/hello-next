import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { listContentUnknownsQueryKey } from "./use-list-content-unknowns.query";
import { AddContentUnknownRequest } from "./content-unknowns.types";

const addContentUnknown = async (
  params: AddContentUnknownRequest,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-unknown`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useAddContentUnknownMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AddContentUnknownRequest) => {
      const resp = await addContentUnknown(params, {
        Authorization: authUser?.jwt,
      });

      return resp;
    },

    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [listContentUnknownsQueryKey, authUser?.jwt],
      });
    },
  });
};
