import { useParams } from "next/navigation";

export const useGetDuParams = () => {
  const params = useParams<{
    "du-course-id": string;
    "du-lesson-id": string;
  }>();

  return {
    courseId: params["du-course-id"],
    lessonId: params["du-lesson-id"],
  };
};
