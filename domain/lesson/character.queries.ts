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
    contentId,
  }: {
    journeyId?: string;
    format?: "list" | "map";
    hanzis?: string[];
    contentId?: string;
  },
  opts: {
    Authorization: string;
  },
): Promise<ICharacter[]> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-characters`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      journeyId: journeyId,
      format,
      // A review of one content only needs that content's characters. Without
      // the id the answer is every character the user has ever touched, which
      // is a far longer list to send and to wait for.
      contentId,
      // hanzis,
    }),
  });
  const resp = (await res.json()) as any;

  return resp as ICharacter[];
};

export const listCharactersQueryId = "list-characters";

/**
 * The key of a characters query: the query id, then whatever the request was
 * scoped to.
 *
 * The scope belongs in the key — the characters of one content are not the
 * characters of another, and neither is the whole list, so one cache entry
 * cannot answer for all three. It is only appended when there is one: the
 * mutations in `character.mutations.ts` write into `[listCharactersQueryId]`
 * by hand, and an unscoped key that had grown trailing placeholders would
 * leave them writing to a query nobody asked for.
 */
const getCharactersQueryKey = (
  queryId: string,
  params?: { contentId?: string; journeyId?: string },
): any[] => [
  queryId,
  ...(params?.contentId ? [params.contentId] : []),
  ...(params?.journeyId ? [params.journeyId] : []),
];

export function useListCharactersQuery(
  params = {} as {
    journeyId?: string;
    hanzis?: string[];
    from?: string;
    contentId?: string;
  },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ICharacter[], Error>({
    queryKey: getCharactersQueryKey(listCharactersQueryId, params),
    queryFn: async () => {
      // if (options.query) {

      if (params?.from) {
        console.log(listCharactersQueryMapId, params);
      }

      const response = await listCharacters(params, {
        Authorization: authUser?.jwt,
      });

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
  params = {} as {
    journeyId?: string;
    hanzis?: string[];
    from?: string;
    contentId?: string;
  },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: getCharactersQueryKey(listCharactersQueryMapId, params),

    queryFn: async () => {
      // if (options.query) {

      if (params?.from) {
        console.log(listCharactersQueryMapId, params);
      }
      const response = await listCharacters(
        { ...params, format: "map" },
        {
          Authorization: authUser?.jwt,
        },
      );

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
