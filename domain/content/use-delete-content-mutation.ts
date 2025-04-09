"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddContentParams } from "./content.types";
import { siteConfig } from "@/lib/config";
import { getContentQueryId } from "./content.queries";

type DeleteContentParams = {
  id: string;
};

const deleteContent = async (
  params: DeleteContentParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-content`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useDeleteContentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: DeleteContentParams) => {
      const response = await deleteContent(params, {
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
          return old.map((item: any) => {
            if (item?.id === data?.id) {
              return data;
            }

            return item;
          });
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
