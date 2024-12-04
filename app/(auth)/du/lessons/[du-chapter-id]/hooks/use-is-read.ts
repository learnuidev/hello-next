/* eslint-disable @next/next/no-img-element */
import { useGetDuParams } from "@/app/(auth)/du/hooks/use-get-du-params";
import { useListStudiedLessonsQuery } from "@/app/(auth)/du/hooks/use-list-studied-lessons-query";

export function useIsRead(lessonId: string) {
  const { cookie } = useGetDuParams();
  const { data: studiedLessons } = useListStudiedLessonsQuery({
    cookie,
  });

  const isRead = studiedLessons?.lessons?.find((l) => l?.id == lessonId);

  return !!isRead;
}
