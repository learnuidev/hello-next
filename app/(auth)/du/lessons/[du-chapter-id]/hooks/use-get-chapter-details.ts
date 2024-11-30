import { DuChapter, DuCourse, DuSection } from "@/app/(auth)/du/du.types";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
// import { DuSection } from "../du.types";

interface GetChapterDetailsResponse {
  course: DuCourse;
  audio_url?: string;
  canonical_url: string;
  subtitles: {
    words: {
      hsk?: number;
      hanzi: string;
      pinyin?: string;
      meaning?: string;
      tc_hanzi: string;
    }[];
  };
}

export const useGetChapterDetails = ({
  chapterId,
  courseId,
  cookie,
}: {
  chapterId: string;
  cookie: string;
  courseId: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<GetChapterDetailsResponse, Error>({
    queryKey: [
      "du-chinese/get-chapter-details",
      chapterId,
      cookie,
      courseId,
      authUser?.jwt,
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/get-chapter-details`, {
        method: "POST",

        body: JSON.stringify({
          chapterId,
          courseId,
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
