"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryIds } from "../lesson/queryIds";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { listCharactersQueryId } from "./character.queries";

const deleteComponent = async (
  props: { id: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-component`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({ id: props?.id }),
  });

  if (!res?.ok) {
    throw new Error("yoo");
  }
  const resp = (await res.json()) as any;
  return resp;
};

export function useDeleteComponentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { hanzi: string; id: string }) => {
      // if (options.query) {
      const deletedComponent = await deleteComponent(params, {
        Authorization: authUser?.jwt,
      });

      return deletedComponent;
    },

    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries([listCharactersQueryId]);
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
