"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-answers";

const listAnswers = async (
  options: { journeyId?: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      journeyId: options?.journeyId,
    }),
  });
  const resp = await res.json();
  return resp;
};

export function useListAnswersQuery(
  params = {} as { journeyId?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listAnswers, params?.journeyId],
    async () => {
      // if (options.query) {
      const response = await listAnswers(params, {
        Authorization: authUser?.jwt,
      });
      return response?.sort((a: any, b: any) => a?.createdAt - b?.createdAt)
      // }
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt),
      // enabled: Boolean(journeyId),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      // refetchOnWindowFocus: false,
      // refetchOnFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
    }
  );
}
