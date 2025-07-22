import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation } from "@tanstack/react-query";
import { getAudioApi } from "./get-audio.api";
import { GetAudioRequest } from "./audio.types";

export const useGetAudioMutation = () => {
  const jwt = useJwtToken();
  return useMutation({
    mutationFn: async ({ text, lang }: GetAudioRequest) => {
      const audio = await getAudioApi({ text, lang }, { jwt });

      return audio;
    },
  });
};
