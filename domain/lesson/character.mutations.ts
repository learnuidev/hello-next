"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { listCharactersQueryId } from "./character.queries";

export type AddCharacterParams = {
  hanzi: string;
  // pinyin: string;
  // level?: number;
  // en: string;
  // nomad: string;
  // destination: string;
  // location: string;
  journeyId: string;
  // // todo | completed
  status: string;
  story?: string;
  // component: string;
  // sub_components: string[];
  lang?: string;
};

const addCharacter = async (
  options: AddCharacterParams,
  opts: {
    Authorization: string;
  }
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
  return useMutation(
    async (params: AddCharacterParams) => {
      const response = await addCharacter(params, {
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

        queryClient.invalidateQueries([listCharactersQueryId]);
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
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
  }
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
  return useMutation(
    async (params: UpdateCharacterStatusParams) => {
      const response = await updateChracterStatus(params, {
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

        queryClient.refetchQueries([listCharactersQueryId]);
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}

export type UpdateCharacterStoryParams = {
  id: string;
  story: string;
};

const updateChracterStory = async (
  options: UpdateCharacterStoryParams,
  opts: {
    Authorization: string;
  }
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
  return useMutation(
    async (params: UpdateCharacterStoryParams) => {
      const response = await updateChracterStory(params, {
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

        queryClient.invalidateQueries([listCharactersQueryId]);
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
