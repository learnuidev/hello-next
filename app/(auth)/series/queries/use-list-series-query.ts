"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { ISeries } from "../series.types";

const listSeriesApi = async (
  {}: any,
  { token }: { token: string }
): Promise<ISeries[]> => {
  const resp = await fetch(`${siteConfig.apiUrlV2}/v1/list-series`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  return resp.json();
};

export const useListSeriesQuery = () => {
  const token = useJwtToken();
  return useQuery({
    queryKey: ["list-series", token],

    queryFn: async () => {
      const resp = await listSeriesApi({}, { token });

      return resp;
    },
  });
};
