"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";
import { useTitaStore } from "./use-tita-store";

export const useGetAudioResourceQuery = (
  {
    statusUrl,
  }: {
    statusUrl: string;
  },
  options = {} as any
) => {
  const { data: authUser } = useCurrentAuthUser({});

  const resourceStatus = useTitaStore((state) => state.resourceStatus) as any;

  return useQuery({
    queryKey: [
      "get-audio-resource",
      authUser?.jwt,
      statusUrl,
      resourceStatus?.percent,
    ],
    queryFn: async () => {
      if (statusUrl && resourceStatus?.percent !== 100) {
        const audioResource = await fetch("/api/get-audio-resource", {
          method: "POST",

          body: JSON.stringify({
            statusUrl,
          }),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        });

        return audioResource.json();
      }
    },
    enabled: Boolean(statusUrl) && resourceStatus?.percent !== 100,
    refetchInterval: 2000,
    ...options,
  });
};
