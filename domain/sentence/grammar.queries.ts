"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-grammars";

const listGrammars = async (
  options: { sentenceId: string; content: string },
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

export function useListGrammarsQuery(
  params = {} as { sentenceId: string; content: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listGrammars, params?.sentenceId],
    async () => {
      if (params?.sentenceId && params?.content) {
        const response = await listGrammars(params, {
          Authorization: authUser?.jwt,
        });
        return response
      }
    },
    {
      ...options,
      enabled: options?.enabled && Boolean(authUser?.jwt),
      // cacheTime: 1000 * 60 * 300, // 30 minutes,
      // refetchOnWindowFocus: false,
      // refetchOnFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
    }
  );
}
