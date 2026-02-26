import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useNewConvoStore } from "@/components/step";
import {
  extractYoutubeVideoIdAndTime,
  parseYoutubeUrl,
} from "@/components/summary/parse-youtube-url";
import { useMutation, useQuery } from "@tanstack/react-query";

interface YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  author: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
  };
}

const getVideoById = async ({
  url,
  jwt,
}: {
  url: string;
  jwt: string;
}): Promise<YoutubeVideo> => {
  const parsedUrl = extractYoutubeVideoIdAndTime(url);

  const resp = await fetch(`${listenApiUrl}/v1/youtube/get-video-by-id`, {
    method: "POST",
    headers: {
      Authorization: jwt,
    },
    body: JSON.stringify({
      videoId: parsedUrl.videoId,
    }),
  });

  return resp.json();
};

export const useGetVideoByIdQuery = (url: string) => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const jwtToken = useJwtToken();
  return useQuery({
    queryKey: ["youtube/get-video-by-id", url],
    enabled: Boolean(url),

    queryFn: async () => {
      if (url) {
        const youtubeVideo = await getVideoById({ url, jwt: jwtToken });

        setConvo("title", youtubeVideo.title);
        setConvo("description", youtubeVideo.description);
        setConvo("thumbnails", youtubeVideo.thumbnails);
        setConvo("author", youtubeVideo.author);
        return youtubeVideo;
      }
    },
  });
};

export const useGetVideoByIdMutation = (url: string) => {
  const jwtToken = useJwtToken();
  return useMutation({
    mutationFn: async () => {
      if (url) {
        const youtubeVideo = await getVideoById({ url, jwt: jwtToken });

        return youtubeVideo;
      }
    },
  });
};
