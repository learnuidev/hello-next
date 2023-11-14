"use client";
// import { queryIds } from "./queryIds";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/add-steps";

export type AddStepParams = {
  componentId: string;
};

const addSteps = async (
  options: AddStepParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useAddStepsMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: AddStepParams) => {
      const response = await addSteps(params, {
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

        queryClient.invalidateQueries([queryIds?.listComponents]);
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}