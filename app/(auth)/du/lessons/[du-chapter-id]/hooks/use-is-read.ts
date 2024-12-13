/* eslint-disable @next/next/no-img-element */
import { useListStudiedLessonsQuery } from "@/app/(auth)/du/hooks/use-list-studied-lessons-query";

export function useIsRead(lessonId: string) {
  const { data: studiedLessons } = useListStudiedLessonsQuery({});

  const isRead = studiedLessons?.lessons?.find((l) => l?.id == lessonId);

  return !!isRead;
}
