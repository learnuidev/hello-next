"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { listMeaningQueryKey } from "./meaning.queries";
import { UpdateMeaningResponse, updateMeanings } from "./update-meanings.api";

export function useUpdateMeaningMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  const queryClient = useQueryClient();

  return useMutation(
    async (params: any) => {
      const response = await updateMeanings(params, {
        Authorization: authUser?.jwt,
      });

      return response as UpdateMeaningResponse;
    },
    {
      onSuccess: (data: UpdateMeaningResponse) => {
        queryClient.refetchQueries([
          listMeaningQueryKey,
          data.sentenceId,
          data.lang,
        ]);
      },
      ...options,
    }
  );
}
