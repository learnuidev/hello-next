"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-sentences";

const listSentences = async (
  options: { component?: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = (await res.json()) as any;

  return resp;
};

export function useListSentencesQuery(
  params = {} as { component?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  console.log("AUTH USER", authUser);

  return useQuery(
    [queryIds.list_sentences, params?.component],
    async () => {
      if (authUser?.jwt) {
        const response = await listSentences(params, {
          Authorization: authUser?.jwt,
        });
        return response;
      }
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt),
      // cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
