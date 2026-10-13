"use client";

import { siteConfig } from "@/lib/config";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ListReaderItemsResponse } from "./reader.types";

export interface ListReaderItemsParams {
  limit?: number;
  direction?: "asc" | "desc";
  exclusiveStartKey?: string;
}

export const listReaderItems = async (
  params: ListReaderItemsParams,
  opts: { Authorization: string },
): Promise<ListReaderItemsResponse> => {
  const queryParams = new URLSearchParams();
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.direction) queryParams.append("direction", params.direction);
  if (params.exclusiveStartKey)
    queryParams.append("exclusiveStartKey", params.exclusiveStartKey);

  const res = await fetch(
    `${siteConfig.contentApi}/v1/reader-items?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Failed to list your texts");
  }

  return resp;
};

export function useListReaderItemsQuery(params: ListReaderItemsParams = {}) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListReaderItemsResponse>({
    queryKey: ["list-reader-items", params.limit, params.direction],
    queryFn: async () => {
      return listReaderItems(params, { Authorization: authUser?.jwt });
    },
    enabled: Boolean(authUser?.jwt),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

/**
 * The library, one cursor page at a time: each "load more" asks the server for
 * the next `nextToken` page instead of pulling the whole library up front.
 */
export function useInfiniteListReaderItemsQuery(
  params: { limit?: number; direction?: "asc" | "desc" } = {},
) {
  const { data: authUser } = useCurrentAuthUser({});
  const limit = params.limit ?? 20;

  return useInfiniteQuery<ListReaderItemsResponse>({
    queryKey: ["list-reader-items", "infinite", limit, params.direction],
    queryFn: async ({ pageParam }) => {
      return listReaderItems(
        {
          limit,
          direction: params.direction,
          exclusiveStartKey: pageParam as string | undefined,
        },
        { Authorization: authUser?.jwt },
      );
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.pagination.nextToken ?? undefined,
    enabled: Boolean(authUser?.jwt),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

