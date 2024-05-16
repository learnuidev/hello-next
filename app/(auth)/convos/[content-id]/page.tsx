// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";
// import Link from "next/link";
import Link from "next/link";

import { useState } from "react";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { NavBar } from "@/components/navbar";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useConvosStore } from "@/stores/convos-store";
import { ConvosNavBar } from "../convos-nav-bar";
import { ConvoDetails } from "../convo-details";
import { useSelectedCharacter } from "../use-selected-character";

import { useViewModeStore } from "../new-convo/use-viewmode-store";
import { PlusIcon } from "@/components/ui/icons";
import { NewConvo } from "../new-convo/new-convo";
import { useListContentsQuery } from "@/domain/content/content.queries";
import ConvoItem from "./convo-item";

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
  // const lessonId = useConvosStore((state: any) => state?.convoId);

  const params = useParams() as {
    "content-id": string;
  };

  const lessonId = params["content-id"];
  const searchParams = useSearchParams();

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

  const contentType = searchParams.get("type");

  if (contentType === "conversation") {
    return <ConvoItem />;
  }

  return (
    <main className="">
      <ConvosNavBar />

      <ConvoDetails lessonId={lessonId} />
    </main>
  );
}
