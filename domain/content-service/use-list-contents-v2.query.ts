"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

interface ListContentsParams {
  status:
    | "QUEUED"
    | "PROCESSING_YOUTUBE"
    | "PROCESSING_TEXT"
    | "PROCESSING_WEBSITE"
    | "AUDIO_GENERATING"
    | "TRANSLATING"
    | "COMPLETED"
    | "FAILED"
    | "DLQ_FAILED";
  limit: number;
  direction: "asc" | "desc";
  exclusiveStartKey?: string;
}

const listContentsApi = async (
  { status, limit, direction, exclusiveStartKey }: ListContentsParams,
  opts: { Authorization: string }
) => {
  const params = new URLSearchParams({
    ...(status && { status }),
    ...(limit && { limit: limit.toString() }),
    ...(direction && { direction }),
    ...(exclusiveStartKey && { exclusiveStartKey }),
  });

  const url = `${siteConfig.contentApi}/v1/contents${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
  });
  const resp = (await res.json()) as any;

  return resp;
};

export function useListContentsV2Query({
  status,
  limit,
  direction,
  exclusiveStartKey,
}: ListContentsParams) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [
      "list-contents-v2",
      ...[status, limit, direction, exclusiveStartKey].filter(Boolean),
    ],
    queryFn: async () => {
      const response = await listContentsApi(
        { status, limit, direction, exclusiveStartKey },
        { Authorization: authUser?.jwt }
      );

      return response;
    },

    enabled: Boolean(authUser?.jwt),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
