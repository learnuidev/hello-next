"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { siteConfig } from "@/lib/config";
import { useCurrentAuthUser } from "../auth/auth.queries";

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
    lang?: string;
  }[];
}

function getAllSubstringIndices(mainString: string, subString: string) {
  let indices = [];
  let startIndex = 0;

  while ((startIndex = mainString.indexOf(subString, startIndex)) > -1) {
    indices.push(startIndex);
    startIndex += 1; // Move to the next character to continue the search
  }

  return indices;
}

const listGrammars = async (
  options: {
    sentenceId?: string;
    content: string;
    lang?: string;
    grammarCache: any;
  },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-grammars`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const resp = (await res.json()) as any;

  let newGrammarAnalysis;
  const sentenceId = resp?.sentenceId;

  if (Array.isArray(resp?.grammarAnalysis)) {
    newGrammarAnalysis = resp.grammarAnalysis;
  } else {
    newGrammarAnalysis = Object.values(resp.grammarAnalysis)[0] as any;
  }

  if (options?.lang === "zh") {
    newGrammarAnalysis = newGrammarAnalysis?.map((item: any) => {
      return {
        ...item,
        startIndex: sentenceId?.indexOf(item?.hanzi || item?.input),
        offset: (item?.hanzi || item?.input)?.length,
        allIndexes: getAllSubstringIndices(
          sentenceId,
          item?.hanzi || item?.input
        ),
      };
    });
  }

  const newResp = {
    ...resp,
    grammarAnalysis: newGrammarAnalysis,
  };
  return newResp as ListGrammarsResponse;
};

type FilterOption = "unique";

export function useListGrammarsQuery(
  params = {} as {
    sentenceId?: string;
    content: string;
    lang?: string;
    filterOptions?: FilterOption[];
  },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListGrammarsResponse, Error>({
    queryKey: [
      queryIds.listGrammars,
      params?.content,
      JSON.stringify(params?.filterOptions),
    ],
    queryFn: async () => {
      if (Object.keys(params)?.length && params?.lang) {
        const content = params?.content || params?.sentenceId || "";

        let grammarCache = null;

        // if (params?.lang === "zh") {
        //   try {
        //     grammarCache =
        //       content?.length > 20 ? await getDictionaryHandler(content) : null;
        //   } catch (err) {
        //     grammarCache = null;
        //   }
        // }

        const response = (await listGrammars(
          { ...params, grammarCache },
          {
            Authorization: authUser?.jwt,
          }
        )) as ListGrammarsResponse;

        if (params?.filterOptions?.includes("unique")) {
          let res = [];

          const uniqueGrammarHanzis = [
            ...new Set(
              response?.grammarAnalysis?.map((ga) => ga?.hanzi || ga?.input)
            ),
          ];

          for (const uniqueGrammar of uniqueGrammarHanzis) {
            const matchedGrammars = response?.grammarAnalysis.filter(
              (ga: any) => (ga?.hanzi || ga?.input) === uniqueGrammar
            );
            const matchedSegment = matchedGrammars?.[0];

            res.push({
              ...matchedSegment,
              totalFrequency: matchedGrammars?.length,
            });
          }

          return {
            ...response,
            grammarAnalysis: res,
          };
        }

        return response;
      }
    },

    ...options,
    retry: 5,
    enabled: Boolean(params?.sentenceId || params?.content),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryCount: 1,
  });
}
