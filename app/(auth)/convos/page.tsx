// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";
// import Link from "next/link";

import { useState } from "react";

import { NavBar } from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoDetails } from "./convo-details";
import { ConvosNavBar } from "./convos-nav-bar";
import { useSelectedCharacter } from "./use-selected-character";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { formatPercentage } from "@/app/profile/utils/format-percentage";
import { HoverEffect } from "@/components/hover-effect";
import { useSearchQueryStore } from "@/components/search/state";
import { PlusIcon } from "@/components/ui/icons";
import { Icons } from "@/components/ui/icons.v2";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useListConversationsQuery } from "@/domain/conversation/use-list-conversations-query";
import { useIsNewContentFormEnabled } from "@/libs/posthog/hooks/use-is-new-content-form-enabled";
import { NewContent } from "./new-content/new-content";

import { NewConvo } from "./new-convo/new-convo";
import { useContentTypeStore } from "./use-content-type-store";
import { useViewModeStore } from "./new-convo/use-viewmode-store";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";

type ContentType = {
  title: string;
  id: string;
  transcriptions?: any;
  type: string;
};

function ContentsList({ contentViewType }: { contentViewType: string }) {
  const { data: myContent, isLoading: isContentsLoading } =
    useListContentsQuery();
  const { data, isLoading: isPublicContentLoading } =
    useListPublishedContentsQuery({});

  const isLoading = isContentsLoading || isPublicContentLoading;

  const contents = contentViewType === "public" ? data?.items : myContent;

  const contentType = useContentTypeStore((state) => state.contentType);

  const { data: conversations } = useListConversationsQuery();

  const query = useSearchQueryStore((state) => state.query2);
  const lang = useGetCurrentLang();

  const searchTransacription = (content: ContentType, query: string) => {
    if (!content?.transcriptions?.length) {
      return false;
    }

    return true;
  };

  const projects = contents
    ? contents
        ?.filter((content: any) => {
          if (!query) {
            if (contentType) {
              if (contentType === "all") {
                return true;
              }
              return contentType === content?.type;
            }

            return true;
          }

          return JSON.stringify(content)
            ?.toLowerCase()
            ?.includes(query?.toLowerCase());

          return (
            content?.title?.toLowerCase()?.includes(query?.toLowerCase()) &&
            searchTransacription(content, query)
          );
        })
        ?.filter((item: any) => item?.lang === lang)
        ?.map((content: any) => {
          return {
            title: content?.title,
            description: content?.description || content?.title,
            link: `/convos/${content?.id}`,
          };
        })
    : [];

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!projects?.length) {
    return (
      <Nothing message={`Nothing found for: ${query}`} icon={Icons.content} />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8">
      {projects?.length > 0 && <HoverEffect items={[...projects]} />}
    </div>
  );
}

function LessonCard({ lesson }: any) {
  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const lessonId = useConvosStore((state: any) => state?.convoId);
  const setLessonId = useConvosStore((state: any) => state?.setConvoId);

  const router = useRouter();

  const totalLessonsLength = lesson?.transcriptions?.length;

  const completedLessons = lesson?.transcriptions?.filter((phrase: any) =>
    allAnswers?.find(
      (answer: any) =>
        answer?.phraseId === phrase?.id && answer?.status === "correct"
    )
  );

  const uncompletedLessons = lesson?.transcriptions?.filter(
    (phrase: any) =>
      !completedLessons?.find(
        (completedPhrase: any) => completedPhrase?.id === phrase?.id
      )
  );

  const firstUnCompletedLesson = uncompletedLessons?.[0];

  const percentCompleted = completedLessons?.length / totalLessonsLength || 0;
  return (
    <button
      onClick={() => {
        setLessonId(lesson?.id);
        router.push(`/convos/${lesson?.id}`);
      }}
      className="px-4 md:px-32 font-light flex justify-between items-center w-full md:mt-2"
    >
      <h2 className="text-2xl">{lesson?.title}</h2>
      <p className="text-2xl">{formatPercentage(percentCompleted)}</p>
    </button>
  );
}
export default function Convos() {
  const [contentViewType, setViewType] = useState("me");
  const [isTocHidden, setIsTocHidden] = useState(false);
  const lessonId = useConvosStore((state: any) => state?.convoId);

  const viewMode = useViewModeStore((state: any) => state.viewMode);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const { data: contents } = useListContentsQuery();

  const routeName = usePathname();

  const router = useRouter();

  // CONVOS

  const setLessonId = useConvosStore((state: any) => state?.setConvoId);

  const isNewContentEnabled = useIsNewContentFormEnabled();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  console.log("process.env", process.env);

  const ContentViewMode = () => {
    console.log("NEW CONTENT ENABLED", isNewContentEnabled);
    if (isNewContentEnabled) {
      return <NewContent />;
    }

    return <NewConvo />;
  };

  console.log("VIEW MODE", viewMode);

  return viewMode === "convo/add" ? (
    <ContentViewMode />
  ) : (
    <main className="">
      <div className="flex space-x-4">
        <button
          className={
            contentViewType === "public" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("public");
          }}
        >
          Public
        </button>
        <button
          className={
            contentViewType === "me" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("me");
          }}
        >
          Me
        </button>
      </div>
      {selectedChar ? null : lessonId && routeName?.includes("/convos") ? (
        <ConvosNavBar />
      ) : (
        <NavBar />
      )}

      {selectedChar ? null : lessonId &&
        routeName?.includes("/convos") ? null : (
        <div className="px-4 md:px-8 mt-4">
          <button
            className="text-xl dark:hover:text-white md:px-4 py-1 dark:text-slate-600 shadow-md rounded-full"
            onClick={() => {
              setViewMode("convo/add");
            }}
          >
            <PlusIcon />
          </button>
        </div>
      )}

      {lessonId ? (
        <ConvoDetails lessonId={lessonId} />
      ) : (
        <div className="my-8 space-y-8">
          <ContentsList contentViewType={contentViewType} />
        </div>
      )}
    </main>
  );
}
