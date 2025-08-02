import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation } from "@tanstack/react-query";
import { getAudioApi } from "./get-audio.api";
import { GetAudioRequest } from "./audio.types";
import { useAudioProviderState } from "@/components/settings-dialog/hooks/use-audio-provider-state";

export const useGetAudioMutation = () => {
  const { provider } = useAudioProviderState();
  const jwt = useJwtToken();
  return useMutation({
    mutationFn: async ({ text, lang }: GetAudioRequest) => {
      const audio = await getAudioApi({ text, lang, provider }, { jwt });

      return audio;
    },
  });
};
