"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { AddSourceParams, Source } from "./source.types";

const addSource = async (
  params: AddSourceParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.contentApi}/v1/add-source`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useAddSourceMutation(
  options?: UseMutationOptions<Source, Error, AddSourceParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<Source, Error, AddSourceParams>({
    mutationFn: async (params: AddSourceParams) => {
      const response = await addSource(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["list-sources"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
