"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { AddContentParams } from "./content.types";
import { siteConfig } from "@/lib/config";
import { useGetListContentsQueryKey } from "./content.queries";
import { useRouter } from "next/navigation";
import { IContent } from "./content.api";
import { useNewConvoStore } from "@/components/step";

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

  const resetConvo = useNewConvoStore((state) => state.resetConvo);
  const router = useRouter();
  const queryClient = useQueryClient();
  const listContentsQueryKey = useGetListContentsQueryKey();
  return useMutation({
    mutationFn: async (params: AddContentParams) => {
      const response = await addContent(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: IContent) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.setQueryData(listContentsQueryKey, (old: any) => {
        return {
          ...old,
          items: [data, ...old?.items],
        };
      });

      resetConvo();

      router.push(`/convos/${data?.id}`);
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
