import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
import { DuSection } from "../du.types";
import { useListStudiedLessonsQuery } from "./use-list-studied-lessons-query";

type Categories = [string, string];
interface ListTopLessonsResponse {
  sections: DuSection[];

  lessons: any[];

  more_categories: Categories[];
}

export const useListLessons = ({
  levels,
  hideStudied,
  cookie,
  query,
  category,
}: {
  levels?: string | string[];
  hideStudied?: boolean;
  cookie?: string;
  query?: string;
  category?: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  const { data: studiedLessons } = useListStudiedLessonsQuery({
    cookie,
  });

  return useQuery<ListTopLessonsResponse, Error>({
    queryKey: [
      "du-chinese/list-lessons",
      JSON.stringify(levels),
      authUser?.jwt,
      hideStudied,
      query,
      category,
      JSON.stringify(studiedLessons),
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/list-lessons`, {
        method: "POST",

        body: JSON.stringify({
          levels,
          hideStudied,
          cookie,
          query,
          category,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      const respJSON = (await resp.json()) as ListTopLessonsResponse;

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
