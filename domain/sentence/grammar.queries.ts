"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-grammars";

export interface ListGrammarsResponse {
  id: string;
  creator: string;
  sentenceId: string;
  createdAt: number;
  grammarAnalysis: {
    hanzi?: string;
    original: string;
    input?: string;
    roman?: string;
    pinyin: string;
    en: string;
    explanation: string;
  }[];
}

const listGrammars = async (
  options: { sentenceId?: string; content: string },
  opts: {
    Authorization: string;
  }
): Promise<ListGrammarsResponse> => {
  const res = await fetch("/api/list-grammars", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = (await res.json()) as any;

  if (Array.isArray(resp?.grammarAnalysis)) {
    return resp as ListGrammarsResponse;
  } else {
    const newResp = {
      ...resp,
      grammarAnalysis: Object.values(resp.grammarAnalysis)[0],
    };

    return newResp as ListGrammarsResponse;
  }
};

export function useListGrammarsQuery(
  params = {} as { sentenceId?: string; content: string; lang?: string },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [queryIds.listGrammars, params?.content, params?.lang],
    queryFn: async (): Promise<ListGrammarsResponse> => {
      const response = await listGrammars(params, {
        Authorization: authUser?.jwt,
      });
      return response as ListGrammarsResponse;
    },

    ...options,
    retry: false,
    enabled: options?.enabled && Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
