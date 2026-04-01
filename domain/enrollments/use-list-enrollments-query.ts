"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import {
  ListEnrollmentsResponse,
  ListEnrollmentsParams,
} from "./enrollments.types";

const listEnrollments = async (
  params: ListEnrollmentsParams = {},
  opts: {
    Authorization: string;
  },
): Promise<ListEnrollmentsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.exclusiveStartKey) {
    queryParams.append("exclusiveStartKey", params.exclusiveStartKey);
  }

  const res = await fetch(
    `${siteConfig.contentApi}/v1/enrollments?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to list enrollments");
  }

  const resp = await res.json();
  return resp;
};

export function useListEnrollmentsQuery(
  params: ListEnrollmentsParams = {},
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListEnrollmentsResponse>({
    queryKey: ["list-enrollments", params],
    queryFn: async () => {
      const response = await listEnrollments(params, {
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
