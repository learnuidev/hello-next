import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
import { DuSection } from "../du.types";

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
}: {
  levels?: string | string[];
  hideStudied?: boolean;
  cookie?: string;
  query?: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListTopLessonsResponse, Error>({
    queryKey: [
      "du-chinese/list-lessons",
      JSON.stringify(levels),
      authUser?.jwt,
      hideStudied,
      query,
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/list-lessons`, {
        method: "POST",

        body: JSON.stringify({
          levels,
          hideStudied,
          cookie,
          query,
        }),
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      return resp.json();
    },
  });
};
