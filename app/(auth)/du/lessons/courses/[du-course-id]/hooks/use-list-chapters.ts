import { DuChapter } from "@/app/(auth)/du/du.types";
import { useListStudiedLessonsQuery } from "@/app/(auth)/du/hooks/use-list-studied-lessons-query";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
// import { DuSection } from "../du.types";

interface ListChaptersResponse {
  lessons: DuChapter[];
}

export const useListChapters = ({
  courseId,
  cookie,
}: {
  courseId: string;
  cookie: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  const { data: studiedLessons } = useListStudiedLessonsQuery({});

  return useQuery<ListChaptersResponse, Error>({
    queryKey: [
      "du-chinese/list-chapters",
      courseId,
      authUser?.jwt,
      JSON.stringify(studiedLessons),
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/list-chapters`, {
        method: "POST",

        body: JSON.stringify({
          courseId,
          cookie,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      const respJSON = (await resp.json()) as ListChaptersResponse;

      return {
        ...respJSON,
        lessons: respJSON.lessons.map((lesson) => {
          const isRead = studiedLessons?.lessons?.find(
            (l) => l?.id == lesson?.id
          );
          return {
            ...lesson,
            status: isRead ? "read" : "not_started",
          };
        }),
      };
    },
  });
};
