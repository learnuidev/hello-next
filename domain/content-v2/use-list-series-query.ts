"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { Series } from "./series.types";
import { TopicType } from "../topic/topic.types";

export interface ListSeriesParams {
  topicType?: TopicType;
  sourceId?: string;
  limit?: number;
  direction?: "asc" | "desc";
  exclusiveStartKey?: string;
}

export interface ListSeriesResponse {
  items: Series[];
  pagination: {
    direction: "asc" | "desc";
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}

const listSeries = async (
  params: ListSeriesParams,
  opts: {
    Authorization: string;
  }
): Promise<ListSeriesResponse> => {
  const queryParams = new URLSearchParams();
  if (params.topicType) queryParams.append("topicType", params.topicType);
  if (params.sourceId) queryParams.append("sourceId", params.sourceId);
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.direction) queryParams.append("direction", params.direction);
  if (params.exclusiveStartKey)
    queryParams.append("exclusiveStartKey", params.exclusiveStartKey);

  const res = await fetch(
    `${siteConfig.contentApi}/v1/series?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    }
  );
  const resp = await res.json();
  return resp;
};

export function useListSeriesQuery(
  params: ListSeriesParams = {},
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListSeriesResponse>({
    queryKey: [
      "list-series",
      ...Object.entries(params).filter(([_, v]) => v != null),
    ],
    queryFn: async () => {
      const response = await listSeries(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
