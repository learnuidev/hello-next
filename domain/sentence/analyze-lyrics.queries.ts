"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { meaningQueryIds } from "./meaning.query-ids";
import { ListMeaningsResponse } from "./meanings.types";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/analyze-lyrics";

const analyzeLyrics = async (
  options: { lyrics: string },
  opts: {
    Authorization: string;
  }
): Promise<ListMeaningsResponse> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = (await res.json()) as ListMeaningsResponse;

  return resp;
};

export function useAnalyrizeLyricsQuery(
  params = {} as { lyrics: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [meaningQueryIds.listMeanings, params.lyrics],

    queryFn: async () => {
      const response = await analyzeLyrics(params, {
        Authorization: authUser?.jwt,
      });
      return response as ListMeaningsResponse;
    },

    ...options,
    retry: false,
    enabled: Boolean(params.lyrics) && Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
