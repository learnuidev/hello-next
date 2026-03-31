"use client";

import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { Series } from "./series.types";
import { ContentV2 } from "./content-v2.types";

export interface GetSeriesDetailsResponse {
  series: Series;
  episodes: ContentV2[];
}

export interface GetSeriesDetailsParams {
  seriesId: string;
}

const getSeriesDetails = async (
  params: GetSeriesDetailsParams,
  opts: {
    Authorization: string;
  },
): Promise<GetSeriesDetailsResponse> => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/series/${params.seriesId}`,
    {
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );
  const resp = await res.json();
  return resp;
};

export function useGetSeriesDetailsQuery(
  params: GetSeriesDetailsParams,
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<GetSeriesDetailsResponse>({
    queryKey: ["get-series-details", params.seriesId],
    queryFn: async () => {
      const response = await getSeriesDetails(params, {
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
