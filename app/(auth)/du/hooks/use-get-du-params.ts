import { useParams } from "next/navigation";

export const useGetDuParams = () => {
  const params = useParams<{
    "du-course-id": string;
    "du-chapter-id": string;
  }>();

  return {
    courseId: params["du-course-id"],
    chapterId: params["du-chapter-id"],
  };
};
