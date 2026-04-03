"use client";

import { useQuery } from "@tanstack/react-query";

import { siteConfig } from "@/lib/config";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ICharacter } from "../character/character.types";

const listCharacters = async (
  {
    journeyId,
    format = "list",
    hanzis,
  }: { journeyId?: string; format?: "list" | "map"; hanzis?: string[] },
  opts: {
    Authorization: string;
  }
): Promise<ICharacter[]> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-characters`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      journeyId: journeyId,
      format,
      hanzis,
    }),
  });
  const resp = (await res.json()) as any;

  return resp as ICharacter[];
};

export const listCharactersQueryId = "list-characters";
export function useListCharactersQuery(
  params = {} as { journeyId?: string; hanzis?: string[]; from?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ICharacter[], Error>({
    queryKey: [listCharactersQueryId, params?.hanzis],
    queryFn: async () => {
      console.log("FROM", params.from);
      // if (options.query) {
      const response = await listCharacters(params, {
        Authorization: authUser?.jwt,
      });

      console.log(`RESP: ${params.from}`, response);

      return (
        response?.sort((a: any, b: any) => a?.createdAt - b?.createdAt) || []
      );
      // }
    },

    ...options,
    enabled:
      Boolean(authUser?.jwt) &&
      !!(params?.hanzis ? params?.hanzis?.length > 0 : true),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export const listCharactersQueryMapId = "list-characters-map";
export function useListCharactersMapQuery(
  params = {} as { journeyId?: string; hanzis?: string[]; from?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: [listCharactersQueryMapId, JSON.stringify(params?.hanzis)],

    queryFn: async () => {
      console.log("FROM", params.from);
      // if (options.query) {
      const response = await listCharacters(
        { ...params, format: "map" },
        {
          Authorization: authUser?.jwt,
        }
      );

      console.log(`RESP: ${params.from}`, response);

      return response;
    },

    ...options,
    enabled:
      Boolean(authUser?.jwt) &&
      !!(params?.hanzis ? params?.hanzis?.length > 0 : true),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
