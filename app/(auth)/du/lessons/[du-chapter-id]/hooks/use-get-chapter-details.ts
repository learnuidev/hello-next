import { DuChapter, DuSection } from "@/app/(auth)/du/du.types";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
// import { DuSection } from "../du.types";

interface ListChaptersResponse {
  lessons: DuChapter[];
}

export const useGetChapterDetails = ({
  chapterId,
  cookie,
}: {
  chapterId: string;
  cookie: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListChaptersResponse, Error>({
    queryKey: [
      "du-chinese/get-chapter-details",
      chapterId,
      cookie,
      authUser?.jwt,
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/get-chapter-details`, {
        method: "POST",

        body: JSON.stringify({
          chapterId,
          cookie,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      return resp.json();
    },
  });
};
