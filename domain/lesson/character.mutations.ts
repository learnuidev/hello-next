"use client";

import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { getCharacterQueryId } from "../character/use-get-character-query";
import {
  listCharactersQueryId,
  listCharactersQueryMapId,
} from "./character.queries";

export type AddCharacterParams = {
  hanzi: string;
  journeyId: string;
  status: string;
  story?: string;
  lang?: string;
};

const addCharacter = async (
  options: AddCharacterParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-character`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useAddCharacterMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: AddCharacterParams) => {
      const response = await addCharacter(params, {
        Authorization: authUser?.jwt,
      });

      queryClient.refetchQueries({
        queryKey: [getCharacterQueryId, params.hanzi],
      });

      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

// ====

export type UpdateCharacterStatusParams = {
  characterId: string;
  status?: string;
} & any;

const updateChracterStatus = async (
  options: UpdateCharacterStatusParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/update-character-status`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });

  if (!res.ok) {
    throw Error(`Message ${res.statusText}`);
  }
  const resp = await res.json();
  return resp;
};

export function useUpdateCharacterStatusMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: UpdateCharacterStatusParams) => {
      const response = await updateChracterStatus(params, {
        Authorization: authUser?.jwt,
      });

      // queryClient.invalidateQueries({ queryKey: [listCharactersQueryId] });
      // queryClient.invalidateQueries({ queryKey: [listCharactersQueryMapId] });

      // if (options?.onSucess) {
      //   options?.onSuccess(response);
      // }

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
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries({ queryKey: [listCharactersQueryId] });
      queryClient.invalidateQueries({ queryKey: [listCharactersQueryMapId] });
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export type UpdateCharacterStoryParams = {
  id: string;
  story: string;
  pinyin?: string | null;
};

const updateChracterStory = async (
  options: UpdateCharacterStoryParams,
  opts: {
    Authorization: string;
  },
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/update-story`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateCharacterStoryMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: UpdateCharacterStoryParams) => {
      const response = await updateChracterStory(params, {
        Authorization: authUser?.jwt,
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
    ...options,
    onSuccess: (data) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
