"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

export interface ICharacter {
  reviewHistory: {
    createdAt: number;
    timeTaken: number;
    ponderTime?: number;
    startTime: number;
    endTime: number;
    reviewDate: string;
    outcome: string;
  }[];
  location: string;
  component: string;
  sub_components: { hanzi: string; en: string }[];
  status: string;
  createdAt: number;
  en: string;
  pinyin: string;
  story: string;
  group?: string;
  tone_level?: number;
  data_version: string;
  level: number;
  rightCount: number;
  userId: string;
  nomad: string;
  destination: string;
  journeyId: string;
  next_review_date: number;
  id: string;
  rightAt: number;
  forgottenAt: number;
  hanzi: string;
  input?: string;
  lang?: string;
  steps?: any;
  roman?: string;
  track?: boolean;
}

const listCharacters = async (
  {
    journeyId,
    format = "list",
  }: { journeyId?: string; format?: "list" | "map" },
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
    }),
  });
  const resp = (await res.json()) as any;

  return resp as ICharacter[];
};

export const listCharactersQueryId = "list-characters";
export function useListCharactersQuery(
  params = {} as { journeyId?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ICharacter[], Error>({
    queryKey: [listCharactersQueryId],
    queryFn: async () => {
      // if (options.query) {
      const response = await listCharacters(params, {
        Authorization: authUser?.jwt,
      });
      return (
        response?.sort((a: any, b: any) => a?.createdAt - b?.createdAt) || []
      );
      // }
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export const listCharactersQueryMapId = "list-characters-map";
export function useListCharactersMapQuery(
  params = {} as { journeyId?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: [listCharactersQueryMapId],
    queryFn: async () => {
      // if (options.query) {
      const response = await listCharacters(
        { ...params, format: "map" },
        {
          Authorization: authUser?.jwt,
        }
      );

      return response;
    },

    ...options,
    enabled: Boolean(authUser?.jwt),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
