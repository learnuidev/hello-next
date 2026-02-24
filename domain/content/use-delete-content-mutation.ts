"use client";

import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { useContentsStore } from "./content.queries";

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

  const setContents: any = useContentsStore((state) => state.setContents);

  return useMutation({
    mutationFn: async (params: DeleteContentParams) => {
      setContents((prevContent: any) => {
        return {
          ...prevContent,
          items: prevContent?.items?.filter(
            (item: any) => item.id !== params.id
          ),
        };
      });
      const response = await deleteContent(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      // queryClient.setQueriesData(
      //   [getContentQueryId, data?.id] as any,
      //   (old: any) => {
      //     return data;
      //   }
      // );

      // queryClient.setQueryData(listContentsQueryKey, (old: any) => {
      //   return {
      //     ...old,
      //     items: old?.items?.map((item: any) => {
      //       if (item?.id === data?.id) {
      //         return data;
      //       }

      //       return item;
      //     }),
      //   };
      // });
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
