import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
// import { ListenMedia } from "../listen.types";
// import { listenApiUrl } from "../constants";

interface ChapterSection {
  id: string;
  title: string;
  sectionNumber: number;
}

const listChapterSections = async ({
  jwt,
  chapterId,
  lastEvaulatedKey,
}: {
  jwt: string;
  chapterId: string;
  lastEvaulatedKey?: string;
}): Promise<ChapterSection[]> => {
  const resp = await fetch(`${listenApiUrl}/v1/list-chapter-sections`, {
    method: "POST",

    body: JSON.stringify({ lastEvaulatedKey, chapterId }),
    headers: {
      Authorization: jwt,
    },
  });

  const mediaList = await resp.json();

  return mediaList.items as ChapterSection[];
};

export const useListChapterSectionsQuery = (chapterId: string) => {
  const jwt = useJwtToken();

  return useQuery({
    queryKey: ["list-chapter-sections", chapterId],
    queryFn: async () => {
      const media = await listChapterSections({ jwt, chapterId });

      return media;
    },
  });
};
