"use client";

import "@/libs/cognito/init";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRecentlyWatchedContent } from "../../use-recently-watched-content-store";
import { useGetContentId } from "./use-get-content-id";
import { useListPublishedContentsQuery } from "./use-list-published-contents-query";
import { useGetContentQuery } from "@/domain/content/content.queries";

export function useGo() {
  const lessonId = useGetContentId();

  const { data: content } = useGetContentQuery({ contentId: lessonId });

  const router = useRouter();

  const { data } = useListPublishedContentsQuery({});

  const sameLangContents = useMemo(() => {
    return data?.items?.filter(
      (contentItem: any) => contentItem?.lang === content?.lang
    );
  }, [content?.lang, data?.items]);

  const { setRecentlyWatched } = useRecentlyWatchedContent();

  const currentIndex = sameLangContents?.findIndex(
    (item: any) => item?.id === lessonId
  );

  const goToNext = useCallback(() => {
    const nextLesson = sameLangContents?.[currentIndex + 1];
    if (nextLesson) {
      setRecentlyWatched(nextLesson);

      router.push(`/convos/${nextLesson.id}`);
    } else {
      const nextLesson = sameLangContents?.[0];
      setRecentlyWatched(nextLesson);

      router.push(`/convos/${nextLesson.id}`);
    }
  }, [currentIndex, router, sameLangContents, setRecentlyWatched]);

  const goToBefore = useCallback(() => {
    const previousLesson = sameLangContents?.[currentIndex - 1];
    if (previousLesson) {
      setRecentlyWatched(previousLesson);
      router.push(`/convos/${previousLesson.id}`);
    } else {
      const previousLesson = sameLangContents?.[sameLangContents?.length - 1];
      setRecentlyWatched(previousLesson);
      router.push(`/convos/${previousLesson.id}`);
    }
  }, [currentIndex, router, sameLangContents, setRecentlyWatched]);

  return {
    goToBefore,
    goToNext,
  };
}
