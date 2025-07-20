import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { ListenMedia } from "../listen.types";
import { listenApiUrl } from "../constants";

const listMedias = async (
  jwt: string,
  lastEvaulatedKey?: string
): Promise<ListenMedia[]> => {
  const resp = await fetch(`${listenApiUrl}/v1/list-medias`, {
    method: "POST",

    body: JSON.stringify({ lastEvaulatedKey }),
    headers: {
      Authorization: jwt,
    },
  });

  const mediaList = await resp.json();

  return mediaList.items as ListenMedia[];
};

export const useListMediaQuery = () => {
  const jwt = useJwtToken();

  return useQuery({
    queryKey: ["list-media", jwt],
    queryFn: async () => {
      const media = await listMedias(jwt);

      return media;
    },
  });
};
