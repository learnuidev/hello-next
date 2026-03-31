"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { ListSourcesParams, ListSourcesResponse } from "./source.types";

const listSources = async (
  params: ListSourcesParams,
  opts: {
    Authorization: string;
  },
): Promise<ListSourcesResponse> => {
  const queryParams = new URLSearchParams();
  if (params.filter) queryParams.append("filter", params.filter);
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.direction) queryParams.append("direction", params.direction);
  if (params.exclusiveStartKey)
    queryParams.append("exclusiveStartKey", params.exclusiveStartKey);

  const res = await fetch(
    `${siteConfig.contentApi}/v1/list-sources?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );
  const resp = await res.json();
  return resp;
};

export function useListSourcesQuery(
  params: ListSourcesParams = {},
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListSourcesResponse>({
    queryKey: [
      "list-sources",
      ...Object.entries(params).filter(([_, v]) => v != null),
    ],
    queryFn: async () => {
      const response = await listSources(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    enabled: !!params.filter,
    ...options,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
