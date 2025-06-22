"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { siteConfig } from "@/lib/config";
import { useCurrentAuthUser } from "../auth/auth.queries";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useGetUserPreferenceQuery } from "../user/use-get-user-preference-query";

// TODO: Move this to .env
// const url = `${siteConfig?.apiUrl}/v1/list-hsk-words`;
const url = `${siteConfig?.apiUrl}/v1/list-hsk-words/v3`;

export async function listHSKWords(params: {}) {
  const res = await fetch(`/api/list-hsk-words`, {
    method: "POST",
    headers: {
      Authorization: ``,
    },

    body: JSON.stringify(params),
  });
  const resp = (await res.json()) as any;
  return resp.map((item: any) => {
    return {
      ...item,
      hskLevel: item?.level,
    };
  });
}

export function useListHSKWordsQuery(
  params = {} as { content: string; version?: number },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  const { mode } = useLearningMode();

  const { data: userPreference } = useGetUserPreferenceQuery();

  const initVersion = mode ? (mode === "hsk3" ? 3 : 2) : params?.version;

  const version = userPreference?.learningMode
    ? userPreference?.learningMode === "hsk3"
      ? 3
      : 2
    : initVersion;

  return useQuery({
    queryKey: [queryIds.listHSKWords, authUser?.jwt, version],
    queryFn: async () => {
      // if (!authUser?.jwt) {
      //   if (version === 2) {
      //     return hsk2WordBank;
      //   } else {
      //     return hskWords;
      //   }
      // }
      // if (options.query) {
      const response = await listHSKWords({ ...params, version });

      return response;
    },

    ...options,
    enabled: Boolean(version),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
