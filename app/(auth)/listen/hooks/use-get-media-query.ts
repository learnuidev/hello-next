import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { ListenMedia } from "../listen.types";
import { listenApiUrl } from "../constants";

const getMedia = async (jwt: string, mediaId: string): Promise<ListenMedia> => {
  const resp = await fetch(`${listenApiUrl}/v1/get-media`, {
    method: "POST",

    body: JSON.stringify({ mediaId }),
    headers: {
      Authorization: jwt,
    },
  });

  const mediaList = await resp.json();

  return mediaList as ListenMedia;
};

export const useGetMediaQuery = (id: string) => {
  const jwt = useJwtToken();

  return useQuery({
    queryKey: ["list-media", jwt],
    queryFn: async () => {
      const media = await getMedia(jwt, id);

      return media;
    },
  });
};
