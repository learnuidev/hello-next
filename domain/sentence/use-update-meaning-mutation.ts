"use client";

import { useMutation } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";
import { ListMeaningsResponse } from "./meanings.types";

type UpdateMeaningResponse = ListMeaningsResponse & { updatedAt: string };

export type UpdateMeaningParams = any;

const updateMeanings = async (
  params: any,
  opts: {
    Authorization: string;
  }
): Promise<UpdateMeaningResponse> => {
  const { id, ...rest } = params;
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-meanings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      id,
      ...rest,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resp = (await res.json()) as UpdateMeaningResponse;

  return resp;
};

export function useUpdateMeaningMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async ({ id, ...rest }: any) => {
      const response = await updateMeanings(
        { id, ...rest },
        {
          Authorization: authUser?.jwt,
        }
      );

      return response as UpdateMeaningResponse;
    },
    ...options,
  });
}
