"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getUploadUrl } from "./asset.api";
import { GetHtmlTextParams } from "./asset.types";
import { getHtmlText } from "./resource.api";

export function useGetHtmlTextQuery(
  params = {} as GetHtmlTextParams,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.getUploadUrl, params.url, params.selector, params.ai],
    async () => {
      const response = await getHtmlText(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      enabled:
        Boolean(params.url) &&
        Boolean(params.selector) &&
        Boolean(authUser?.jwt),
      // enabled: Boolean(authUser?.jwt),
      // enabled: Boolean(journeyId),
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
