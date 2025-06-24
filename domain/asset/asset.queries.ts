"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getUploadUrl } from "./asset.api";

interface GetUploadUrlParams {
  urlId: string;
  contentType: string;
  extension: string;
}

export function useGetUploadUrlQuery(
  params = {} as GetUploadUrlParams,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any, any, any>({
    queryKey: [queryIds.getUploadUrl, params.contentType, params.extension],
    queryFn: async () => {
      // if (options.query) {
      const response = await getUploadUrl(params, {
        Authorization: authUser?.jwt,
      });
      return response;
      // }
    },

    ...options,
    enabled:
      Boolean(params.contentType) &&
      Boolean(params.extension) &&
      Boolean(authUser.jwt),
    // enabled: Boolean(authUser?.jwt),
    // enabled: Boolean(journeyId),
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
