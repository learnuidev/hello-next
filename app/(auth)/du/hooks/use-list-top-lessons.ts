import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";
import { DuSection } from "../du.types";

type Categories = [string, string];
interface ListTopLessonsResponse {
  sections: DuSection[];
  more_categories: Categories[];
}

console.log("yo");

export const useListTopLessons = ({
  levels,
  cookie,
}: {
  levels?: string | string[];
  cookie?: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListTopLessonsResponse, Error>({
    queryKey: [
      "du-chinese/list-top-lessons",
      JSON.stringify(levels),
      authUser?.jwt,
    ],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/list-top-lessons`, {
        method: "POST",

        body: JSON.stringify({
          levels,
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
