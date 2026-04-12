"use client";

import { useQuery } from "@tanstack/react-query";

import { siteConfig } from "@/lib/config";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ICharacter } from "./character.types";

const getCharacter = async (
  params: { hanzi: string },
  opts: {
    Authorization: string;
  },
): Promise<ICharacter> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-character`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const resp = (await res.json()) as any;

    throw new Error(resp.message);
  }
  const resp = (await res.json()) as any;
  return resp as ICharacter;
};

export const getCharacterQueryId = "get-character";
export function useGetCharacterQuery(
  params: { hanzi: string },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ICharacter, Error>({
    queryKey: [getCharacterQueryId, params.hanzi],
    queryFn: async () => {
      const response = await getCharacter(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    enabled: Boolean(authUser?.jwt) && Boolean(params?.hanzi),
    retry: false,
    cacheTime: 1000 * 60 * 300, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
