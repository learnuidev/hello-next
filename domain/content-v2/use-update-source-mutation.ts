"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { UpdateSourceParams, Source } from "./source.types";

const updateSource = async (
  params: UpdateSourceParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.contentApi}/v1/update-source`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateSourceMutation(
  options?: UseMutationOptions<Source, Error, UpdateSourceParams>,
) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<Source, Error, UpdateSourceParams>({
    mutationFn: async (params: UpdateSourceParams) => {
      const response = await updateSource(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["list-sources"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-source-details", data?.id],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
