// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";
// import Link from "next/link";
import Link from "next/link";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useConvosStore } from "@/stores/convos-store";
import { ConvosNavBar } from "./convos-nav-bar";
import { ConvoDetails } from "./convo-details";
import { useSelectedCharacter } from "./use-selected-character";

import { useViewModeStore } from "./new-convo/use-viewmode-store";
import { PlusIcon } from "@/components/ui/icons";
import { NewConvo } from "./new-convo/new-convo";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { HoverEffect } from "@/components/hover-effect";
import { useSearchQueryStore } from "@/components/search/state";
import { useListConversationsQuery } from "@/domain/conversation/use-list-conversations-query";

type ContentType = { title: string; id: string; transcriptions?: any };

function ContentsList() {
  const { data: contents } = useListContentsQuery();

  const { data: conversations } = useListConversationsQuery();

  const query = useSearchQueryStore((state) => state.query);

  const searchTransacription = (content: ContentType, query: string) => {
    if (!content?.transcriptions?.length) {
      return false;
    }

    // const foundTranscription = content?.transcriptions
    return true;
  };

  const projects = contents
    ? contents
        ?.filter(
          (content: ContentType) =>
            content?.title?.toLowerCase()?.includes(query?.toLowerCase()) &&
            searchTransacription(content, query)
        )
        ?.map((content: ContentType) => {
          return {
            title: content?.title,
            description: content?.title,
            link: `/convos/${content?.id}`,
          };
        })
    : [];

  // return (
  //   <div className="text-white max-w-5xl mx-auto px-8">
  //     <code>
  //       <pre>{JSON.stringify(conversations, null, 2)}</pre>
  //     </code>
  //   </div>
  // );

  return (
    <div className="max-w-5xl mx-auto px-8">
      {projects?.length > 0 && (
        <HoverEffect items={[...((conversations || []) as any), ...projects]} />
      )}
    </div>
  );
}

function formatPercentage(number: number) {
  return Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(number);
}

// useConvosStore

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

  //   const fistCompletedLesson = lesson?.transcriptions?.filter(lesson => completedLessons?.find(cl => cl?.))

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

    // <Link
    //   target="_blank"
    //   href={
    //     firstUnCompletedLesson
    //       ? `/convos/${lesson?.id}/${firstUnCompletedLesson?.id}`
    //       : `/convos/${lesson?.id}`
    //   }
    //   className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2"
    // >
    //   <h2 className="text-2xl">{lesson?.title}</h2>
    //   <p className="text-2xl">{formatPercentage(percentCompleted)}</p>
    // </Link>
  );
}
export default function Convos() {
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
  // const lessonId = useConvosStore((state: any) => state?.convoId);
  const setLessonId = useConvosStore((state: any) => state?.setConvoId);

  // const router = useRouter();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  return viewMode === "convo/add" ? (
    <NewConvo />
  ) : (
    <main className="">
      {selectedChar ? null : lessonId && routeName?.includes("/convos") ? (
        <ConvosNavBar />
      ) : (
        <NavBar />
      )}

      {selectedChar ? null : lessonId &&
        routeName?.includes("/convos") ? null : (
        <div className="px-4 md:px-28 my-8">
          <button
            className="text-xl dark:hover:text-white shadow-md md:px-4 py-1 rounded-full dark:text-slate-600 shadow-md rounded-full"
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
          {/* {contents?.length &&
            contents?.map((lesson: any) => {
              return <LessonCard key={lesson?.id} lesson={lesson} />;
            })} */}
          <ContentsList />
        </div>
      )}

      {/* <Wordle /> */}
    </main>
  );
}
