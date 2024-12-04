import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { duChineseApiUrl } from "@/libs/du-chinese/du-chinese-api-url";
import { useQuery } from "@tanstack/react-query";

type LessonDocument = {
  id: string;
  title: string;
  level: string;
  synopsis: string;
  author: string;
  free: boolean;
  large_image_url: string;
  medium_image_url: string;
  thumb_image_url: string;
  release_at_formatted: string;
  canonical_url: string;
  path: string;
  locked: boolean;
  crd_url: string;
  audio_url: string;
  release_at: string;
  updated_at: string;
  has_course: boolean;
  course_title: string | null;
  course_group: string | null;
  course_path: string | null;
  course_type: string | null;
  course_position: number | null;
  course: {
    id: number;
  };
};

type ListSavedLessonsResponse = {
  lessons: LessonDocument[];
  next_page_url: string | null;
};

export const listStudiedLessonsQueryKey = "du-chinese/list-studied-lessons";
export const useListStudiedLessonsQuery = ({
  levels,
  cookie,
}: {
  levels?: string | string[];
  cookie?: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListSavedLessonsResponse, Error>({
    queryKey: [listStudiedLessonsQueryKey, authUser?.jwt],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/list-studied-lessons`, {
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
