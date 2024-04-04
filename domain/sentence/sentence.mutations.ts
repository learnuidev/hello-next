"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { queryIds } from "../lesson/queryIds";
import { siteConfig } from "@/lib/config";

const addSentenceUrl = `${siteConfig.apiUrl}/v1/add-sentence`;

export type AddSentenceParams = {
  component: string;
  input: string;
};

const addSentence = async (
  params: AddSentenceParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(addSentenceUrl, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useAddSentenceMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: AddSentenceParams) => {
      const response = await addSentence(params, {
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

        queryClient.invalidateQueries([
          queryIds.listComponents,
          data?.journeyId,
        ]);
      },
    }
  );
}
