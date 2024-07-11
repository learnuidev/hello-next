"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { getUploadUrl } from "./asset.api";
import { siteConfig } from "@/lib/config";

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

  return useQuery(
    [queryIds.getUploadUrl, params.contentType, params.extension],
    async () => {
      // if (options.query) {
      const response = await getUploadUrl(params, {
        Authorization: authUser?.jwt,
      });
      return response;
      // }
    },
    {
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
    }
  );
}

export const listUserAssetsQueryId = "list-user-assets";
export const useListUserAssets = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["listUserAssetsQueryId", authUser?.jwt],
    queryFn: async () => {
      const resp = await fetch(`${siteConfig.apiUrl}/v1/list-user-assets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      if (!resp.ok) {
        throw new Error("Something wrong happened");
      }

      return resp.json();
    },
    retry: false,
  });
};
