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
  course: unknown | null;
  levels: string[];
};

type CourseDocument = {
  id: number;
  title: string;
  description: string;
  group: string;
  path: string;
  levels: string[];
  medium_image_url: string;
  large_image_url: string;
  lesson_count: number;
  lessons_url: string;
  lessons_canonical_path: string;
  type: string;
  placeholder_count: number;
  is_new: boolean;
  document_ids: unknown | null;
  release_at: string;
  level: string;
};

type LessonItem = {
  document_type: "lesson";
  document: LessonDocument;
};

type CourseItem = {
  document_type: "course";
  document: CourseDocument;
};

type ListSavedLessonsResponse = {
  lessons: (LessonItem | CourseItem)[];
  next_page_url: string | null;
};

export const listSavedLessonsQueryKey = "du-chinese/list-saved-lessons";
export const useListSavedLessonsQuery = ({
  levels,
  cookie,
}: {
  levels?: string | string[];
  cookie?: string;
}) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ListSavedLessonsResponse, Error>({
    queryKey: [listSavedLessonsQueryKey, authUser?.jwt, JSON.stringify(levels)],
    queryFn: async () => {
      const resp = await fetch(`${duChineseApiUrl}/v1/list-saved-lessons`, {
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
