import { DuChapter, DuSection } from "@/app/(auth)/du/du.types";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
import { useListTopLessons } from "../../../hooks/use-list-top-lessons";
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

  const { data: courses } = useListTopLessons();

  const selectedSection = courses?.sections?.filter((section) =>
    JSON.stringify(section)?.includes(chapterId)
  )?.[0];

  const selectedItem = selectedSection?.items?.find(
    (item) => item?.id === chapterId
  );

  return useQuery<ListChaptersResponse, Error>({
    queryKey: [
      "du-chinese/get-chapter-details",
      chapterId,
      cookie,
      authUser?.jwt,
      JSON.stringify(courses),
    ],
    queryFn: async () => {
      const selectedItem = selectedSection?.items?.find(
        (item) => item?.id === chapterId
      );

      if (selectedItem?.free) {
        const subtitles = await fetch(selectedItem?.crd_url);

        const subTitlesJson = await subtitles?.json();
        return {
          ...selectedItem,
          subtitles: subTitlesJson,
        };
      }

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
