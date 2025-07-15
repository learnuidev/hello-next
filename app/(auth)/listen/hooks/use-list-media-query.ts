import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { ListenMedia } from "../listen.types";
import { listenApiUrl } from "../constants";

const mockListenMedia: ListenMedia[] = [
  {
    type: "podcast",
    lastUpdated: 1721040000000,
    createdAt: 1721030000000,
    id: "media_001",
    text: "Tech Trends Weekly - Episode 42",
    progress: 58.7,
    lastListened: 1721040000000,
    status: "transcript-generated",
    userId: "user_001",
  },
  {
    type: "audiobook",
    lastUpdated: 1721020000000,
    createdAt: 1721000000000,
    id: "media_002",
    text: "1984 by George Orwell - Chapter 5 and the history of humanity",
    progress: 100.0,
    lastListened: 1721020000000,
    status: "transcript-generated",
    userId: "user_002",
  },
  {
    type: "text",
    lastUpdated: 1721050000000,
    createdAt: 1721050000000,
    id: "media_003",
    text: "Chill Beats Playlist",
    progress: 21.3,
    status: "file-added",
    userId: "user_003",
  },
];

const listMedia = async (jwt: string): Promise<ListenMedia[]> => {
  const resp = await fetch(`${listenApiUrl}/v1/list-media`, {
    method: "POST",

    body: JSON.stringify({}),
    headers: {
      Authorization: jwt,
    },
  });

  const mediaList = await resp.json();

  return mediaList as ListenMedia[];
};

const listMediaMock = async (): Promise<ListenMedia[]> => {
  return mockListenMedia;
  // return [];
};

export const useListMediaQuery = () => {
  const jwt = useJwtToken();

  return useQuery({
    queryKey: ["list-media", jwt],
    queryFn: async () => {
      const media = await listMediaMock();

      return media;
    },
  });
};
