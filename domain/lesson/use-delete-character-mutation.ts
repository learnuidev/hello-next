"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { siteConfig } from "@/lib/config";
import { useCurrentAuthUser } from "../auth/auth.queries";
import {
  listCharactersQueryId,
  listCharactersQueryMapId,
} from "./character.queries";
import { getCharacterQueryId } from "../character/use-get-character-query";

const deleteCharacter = async (
  props: { id: string; hanzi: string },
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-character`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({ id: props?.id }),
  });

  if (!res?.ok) {
    throw new Error("yoo");
  }
  const resp = (await res.json()) as any;
  return {
    ...resp,
    hanzi: props?.hanzi,
  };
};

export function useDeleteCharacterMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { hanzi: string; id: string }) => {
      // if (options.query) {
      const response = await deleteCharacter(params, {
        Authorization: authUser?.jwt,
      });

      queryClient.refetchQueries({
        queryKey: [getCharacterQueryId, response?.hanzi],
      });

      queryClient.setQueryData([listCharactersQueryId], (data: any) => {
        return data.map((item: any) => {
          if (item.id === response.id) {
            return response;
          }
          return item;
        });
      });
      queryClient.setQueryData([listCharactersQueryMapId], (data: any) => {
        return {
          ...data,
          [response.hanzi]: response,
        };
      });

      return response;
    },

    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      // @ts-ignore
      // queryClient.invalidateQueries({ queryKey: [listCharactersQueryMapId] });
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
