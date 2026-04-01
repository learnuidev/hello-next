"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import {
  GetEnrollmentResponse,
  GetEnrollmentParams,
} from "./enrollments.types";

const getEnrollment = async (
  params: GetEnrollmentParams,
  opts: {
    Authorization: string;
  },
): Promise<GetEnrollmentResponse> => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/enrollments/series/${params.seriesId}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to get enrollment");
  }

  const resp = await res.json();
  return resp;
};

export function useGetEnrollmentQuery(
  params: GetEnrollmentParams,
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<GetEnrollmentResponse>({
    queryKey: ["get-enrollment", params.seriesId],
    queryFn: async () => {
      const response = await getEnrollment(params, {
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
