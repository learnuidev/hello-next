"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddContentParams } from "./content.types";
import { siteConfig } from "@/lib/config";

const addContent = async (
  params: AddContentParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-content`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useAddContentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: AddContentParams) => {
      const response = await addContent(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.setQueryData([queryIds?.listContents], (old: any) => {
          return [data, ...old];
        });

        // queryClient.invalidateQueries([
        //   queryIds?.listContents,
        //   data?.journeyId,
        // ]);
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
