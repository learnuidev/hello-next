"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";
import { listHistoryQueryId } from "./history.queries";

type DeleteHistoryParams = any;

const deleteHistory = async (
  params: DeleteHistoryParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-history`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useDeleteHistoryMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: DeleteHistoryParams) => {
      queryClient.setQueryData([listHistoryQueryId], (value: any) => {
        return {
          ...value,
          Items: value?.Items?.filter((hist: any) => hist?.id !== params?.id),
        };
      });
      const response = await deleteHistory(params, {
        Authorization: authUser?.jwt,
      });

      return response;
    },

    ...options,
    onSuccess: (data) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries({ queryKey: [listHistoryQueryId] });
    },
  });
}
