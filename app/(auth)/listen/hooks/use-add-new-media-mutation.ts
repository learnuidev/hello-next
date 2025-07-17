import { useMutation } from "@tanstack/react-query";
import { listenApiUrl } from "../constants";
import { ContentType, ListenMedia } from "../listen.types";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";

export type AddNewMediaParams = {
  text: string;
  type: ContentType;
};

export const useAddNewMediaMutation = () => {
  const jwt = useJwtToken();
  return useMutation({
    mutationFn: async ({
      text,
      type,
    }: AddNewMediaParams): Promise<ListenMedia> => {
      const resp = await fetch(`${listenApiUrl}/v1/add-media`, {
        method: "POST",

        body: JSON.stringify({
          text,
          type,
        }),
        headers: {
          Authorization: jwt,
        },
      });

      const newMedia = await resp.json();

      return newMedia as ListenMedia;
    },
  });
};
