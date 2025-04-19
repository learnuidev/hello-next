"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddContentParams } from "./content.types";
import { siteConfig } from "@/lib/config";
import { getContentQueryId } from "./content.queries";

type UpdateContentParams = {
  id: string;
} & any;

const updateContent = async (
  params: UpdateContentParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/update-content`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateContentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: UpdateContentParams) => {
      const response = await updateContent(params, {
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

        queryClient.setQueriesData(
          [getContentQueryId, data?.id],
          (old: any) => {
            return data;
          }
        );

        queryClient.setQueryData([queryIds?.listContents], (old: any) => {
          return {
            ...old,
            items: old?.items?.map((item: any) => {
              if (item?.id === data?.id) {
                return data;
              }

              return item;
            }),
          };
        });
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
