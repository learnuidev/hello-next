import { useListStudiedLessonsQuery } from "../../hooks/use-list-studied-lessons-query";

export const useListForYou = () => {
  const { data } = useListStudiedLessonsQuery({});

  const filteredData = [
    ...new Set(
      data?.lessons
        ?.filter((lesson) => lesson.course)
        .map((lesson) => lesson.course?.title)
    ),
  ].map((courseTitle) => {
    const course = data?.lessons?.find(
      (lesson) => lesson?.course?.title === courseTitle
    );
    return course?.course;
  });
  return {
    data: {
      title: "Continue Reading",
      items: filteredData,
    },
  };
};
