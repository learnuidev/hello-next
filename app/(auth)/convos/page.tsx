// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";
// import Link from "next/link";
import Link from "next/link";

// import { useRouter as useRouterUrl } from "next/router";

import { Editor } from "@/components/Editor";
import { useState } from "react";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { usePathname, useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
// import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";
import { Wordle } from "@/components/wordle/game";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { course1 } from "@/data/convos/bm1/index";
import { useConvosStore } from "@/stores/convos-store";
import { ConvosNavBar } from "./convos-nav-bar";
import { ConvoDetails } from "./convo-details";
import { useSelectedCharacter } from "./use-selected-character";

import { useViewModeStore } from "./new-convo/use-viewmode-store";
import { PlusIcon } from "@/components/ui/icons";
import { NewConvo } from "./new-convo";
import { useListContentsQuery } from "@/domain/content/content.queries";

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

  // const { asPath } = useRouterUrl();
  // const origin =
  //   typeof window !== "undefined" && window.location.origin
  //     ? window.location.origin
  //     : "";

  // const myUrl = `${origin}${asPath}`;
  // console.log(myUrl);

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
      // target="_blank"
      // href={
      //   firstUnCompletedLesson
      //     ? `/convos/${lesson?.id}/${firstUnCompletedLesson?.id}`
      //     : `/convos/${lesson?.id}`
      // }
      onClick={() => {
        setLessonId(lesson?.id);

        // const rootUrl = new URL("/convos");
        // if (lesson?.id) {
        //   rootUrl.searchParams?.append("lessonId", lesson?.id);
        // }

        // const urlString = rootUrl?.href;

        router.push(`/convos?lessonId=${lesson?.id}`);
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
          {contents?.length &&
            contents?.map((lesson: any) => {
              return <LessonCard key={lesson?.id} lesson={lesson} />;
            })}
        </div>
      )}

      {/* <Wordle /> */}
    </main>
  );
}
