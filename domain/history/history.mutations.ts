"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";
import { listHistoryQueryId } from "./history.queries";

type AddHistoryParams = {
  hanzi: string;
  contentId: string;
  eventType: string;
};

const addHistory = async (
  params: AddHistoryParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-history`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useAddHistoryMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AddHistoryParams) => {
      const response = await addHistory(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },

    ...options,
    onSuccess: (data) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries([listHistoryQueryId] as any);
    },
  });
}
