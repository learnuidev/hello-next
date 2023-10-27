"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-answers";

const listAnswers = async (options: { journeyId?: string }) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      journeyId: options?.journeyId,
    }),
  });
  const resp = await res.json();
  return resp;
};

export function useListAnswersQuery(
  params: { journeyId?: string },
  options = {} as any
) {
  return useQuery(
    [queryIds.listAnswers, params?.journeyId],
    async () => {
      // if (options.query) {
      const response = await listAnswers(params);
      return response;
      // }
    },
    {
      ...options,
      // enabled: Boolean(journeyId),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
