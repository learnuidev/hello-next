"use client";

import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listSentencesQueryKey } from "./sentence.queries";

type DeleteSentenceParams = {
  id: string;
  component: string;
};

const deleteSentence = async (
  params: DeleteSentenceParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-sentence`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useDeleteSentenceMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: DeleteSentenceParams) => {
      const response = await deleteSentence(params, {
        Authorization: authUser?.jwt,
      });
      return { ...response, componentId: params?.component };
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.refetchQueries([
        listSentencesQueryKey,
        data?.componentId,
      ] as any);
    },
  });
}
