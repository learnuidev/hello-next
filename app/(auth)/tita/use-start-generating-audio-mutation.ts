"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import {
  IStartGeneratingAudioParams,
  IStartGeneratingAudioResponse,
} from "@/libs/narakeet/narakeet";
import { useMutation } from "@tanstack/react-query";

export const useStartGeneratingAudioMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (
      params: IStartGeneratingAudioParams
    ): Promise<IStartGeneratingAudioResponse> => {
      const audioResp = await fetch("/api/start-generating-audio", {
        method: "POST",

        body: JSON.stringify(params),

        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      return audioResp.json();
    },
    // ...opts,
  });
};
