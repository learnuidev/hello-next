"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { ListMeaningsResponse } from "./meanings.types";
import { siteConfig } from "@/lib/config";

export interface ListMeaningsParams {
  sentenceId?: string;
  content: string;
  lang: string;
}

export async function poll<T>(
  fn: () => Promise<T>, // The async function to execute
  condition: (result: T) => boolean, // The condition to check
  interval = 1000 // Poll interval (ms), default to 1s
): Promise<T> {
  let result: T = await fn();
  while (!condition(result)) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    result = await fn();
  }
  return result;
}

const listMeanings = async (
  options: {
    sentenceId?: string;
    content: string;
    lang: string;
    type?: "async";
    poll?: boolean;
  },
  opts: {
    Authorization: string;
  }
): Promise<ListMeaningsResponse> => {
  try {
    console.log("is being called");
    const res = await fetch(`${siteConfig.apiUrl}/v1/list-meanings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts?.Authorization}`,
      },
      body: JSON.stringify(options),
    });

    console.log("RES", res);

    if (!res.ok) {
      console.log("NOT OK");
      throw new Error(res.statusText);
    }

    const resp = await res.json();

    if (resp.message === "Step Function executed successfully") {
      const { type, ...rest } = options;

      return poll(
        () => listMeanings({ ...rest, poll: true }, opts),
        (resp: any) => {
          return resp?.id;
        },

        3000
      );
    }

    // if (!resp?.details) {
    //   return listMeanings(options, opts);
    // }

    return resp as ListMeaningsResponse;
  } catch (err: any) {
    if (err.message === "Failed to fetch" && !options?.poll) {
      console.log("FAILED TO FETCH ACTIVATE ASYNC");
      return listMeanings({ ...options, type: "async" }, opts);
    }
    console.log("ERR yo", err?.message);

    throw err;
  }
};

export const listMeaningQueryKey = "list-meanings";

export function useListMeaningsQuery(
  params = {} as ListMeaningsParams,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListMeaningsResponse, Error>({
    queryKey: [listMeaningQueryKey, params.content, params?.lang],

    queryFn: async () => {
      if (params.lang) {
        const response = (await listMeanings(params, {
          Authorization: authUser?.jwt,
        })) as ListMeaningsResponse;

        return response;
      }
    },

    ...options,
    retry: 2,
    enabled: Boolean(params.content) && Boolean(params.lang),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
