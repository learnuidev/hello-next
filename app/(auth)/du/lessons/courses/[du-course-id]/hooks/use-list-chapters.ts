import { DuChapter, DuSection } from "@/app/(auth)/du/du.types";
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

  return useQuery<ListChaptersResponse, Error>({
    queryKey: ["du-chinese/list-chapters", courseId, authUser?.jwt],
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

      return resp.json();
    },
  });
};
