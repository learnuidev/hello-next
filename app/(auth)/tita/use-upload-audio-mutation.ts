"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useMutation } from "@tanstack/react-query";

export const useUploadAudioMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (params: {
      meaningId: string;
      audioUrl: string;
      component: string;
      componentId: string;
    }): Promise<any> => {
      const audioResp = await fetch("/api/upload-audio", {
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
