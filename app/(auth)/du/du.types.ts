export type DuCourse = {
  id: number;
  title: string;
  description: string;
  group: string;
  path: string;
  levels: DuLevels[];
  medium_image_url: string;
  large_image_url: string;
  lesson_count: number;
  lessons_url: string;
  lessons_canonical_path: string;
  type: "multi_lesson" | "course";
  placeholder_count: number;
  is_new: boolean;
  document_ids: null;
  release_at: string;
  free: boolean;
  crd_url: string;
  level: string;
};

type DuLesson = {
  id: string;
  crd_url: string;
  title: string;
  level: DuLevels;
  levels: DuLevels;
  note: string | null;
  synopsis: string;
  author: string | null;
  free: boolean;
  large_image_url: string;
  medium_image_url: string;
  thumb_image_url: string;
  release_at_formatted: string;
  canonical_url: string;
  path: string;
  locked: boolean;
  release_at: string;
  updated_at: string;
  has_course: boolean;
  course_title: string | null;
  course_group: string | null;
  course_path: string | null;
  course_type: string | null;
  course_position: number | null;
  course: DuCourse | null;
};

export type DuSection = {
  section_name: string;
  section_id: string;
  display: string;
  item_type: "course" | "lesson";
  items: (DuCourse | DuLesson)[];
};

type DuLevels =
  | "newbie"
  | "elementary"
  | "intermediate"
  | "upper intermediate"
  | "advanced"
  | "master";

export type DuChapter = {
  id: string;
  title: string;
  level: DuLevels[];
  note: null | string;
  synopsis: string;
  author: null | string;
  free: boolean;
  large_image_url: string;
  medium_image_url: string;
  thumb_image_url: string;
  release_at_formatted: string;
  canonical_url: string;
  path: string;

  locked: boolean;
  release_at: string;
  updated_at: string;
  has_course: boolean;
  course_title: string;
  course_group: string;
  course_path: string;
  course_type: string;
  course_position: number;
  status: "not_started" | "read";
  course: {
    id: number;
    title: string;
    description: string;
    group: string;
    path: string;
    levels: DuLevels[];
    medium_image_url: string;
    large_image_url: string;
    lesson_count: number;
    lessons_url: string;
    lessons_canonical_path: string;
    type: string;
    placeholder_count: number;
    is_new: boolean;
    document_ids: null | any;
    release_at: string;
  };
};
