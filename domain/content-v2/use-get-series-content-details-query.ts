"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { SeriesContentDetails } from "./series-content-details.types";

export interface GetSeriesContentDetailsResponse {
  content: SeriesContentDetails;
}

export interface GetSeriesContentDetailsParams {
  contentId: string;
}

const getSeriesContentDetails = async (
  params: GetSeriesContentDetailsParams,
  opts: {
    Authorization: string;
  },
): Promise<GetSeriesContentDetailsResponse> => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/contents/${params.contentId}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("非常抱歉。我们的软件工程师已获知此情况，会尽快解决。");
  }
  const resp = await res.json();
  return resp;
};

export function useGetSeriesContentDetailsQuery(
  params: GetSeriesContentDetailsParams,
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<GetSeriesContentDetailsResponse>({
    queryKey: ["get-series-content-details", params.contentId],
    queryFn: async () => {
      const response = await getSeriesContentDetails(params, {
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
