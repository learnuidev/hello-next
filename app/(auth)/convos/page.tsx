// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";
// import Link from "next/link";
import Link from "next/link";

import { Editor } from "@/components/Editor";
import { useState } from "react";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
// import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";
import { Wordle } from "@/components/wordle/game";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { course1 } from "@/data/convos/bm1/index";

function formatPercentage(number: number) {
  return Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(number);
}

function LessonCard({ lesson }: any) {
  const { data: allAnswers, isLoading } = useListAnswersQuery();

  const totalLessonsLength = lesson?.lessons?.length;

  const completedLessons = lesson?.lessons?.filter((phrase: any) =>
    allAnswers?.find(
      (answer: any) =>
        answer?.hanzi === phrase?.id && answer?.status === "correct"
    )
  );

  const uncompletedLessons = lesson?.lessons?.filter(
    (phrase: any) =>
      !completedLessons?.find(
        (completedPhrase: any) => completedPhrase?.id === phrase?.id
      )
  );

  const firstUnCompletedLesson = uncompletedLessons?.[0];

  //   const fistCompletedLesson = lesson?.lessons?.filter(lesson => completedLessons?.find(cl => cl?.))

  const percentCompleted = completedLessons?.length / totalLessonsLength || 0;
  return (
    <Link
      target="_blank"
      href={
        firstUnCompletedLesson
          ? `/convos/${lesson?.id}/${firstUnCompletedLesson?.id}`
          : `/convos/${lesson?.id}`
      }
      className="font-light flex justify-between items-center w-full px-4 md:px-32 md:mt-2"
    >
      <h2 className="text-2xl">{lesson?.title}</h2>
      <p className="text-2xl">{formatPercentage(percentCompleted)}</p>
    </Link>
  );
}
export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const router = useRouter();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    // <main className="">
    //   <NavBar />
    //   {/* <NavigatorMap /> */}

    //   <SearchPage />
    // </main>

    <main className="">
      <NavBar />

      <div className="my-8 space-y-8">
        {course1.lessons?.map((lesson: any) => {
          return <LessonCard key={lesson?.id} lesson={lesson} />;
        })}
      </div>

      {/* <Wordle /> */}
    </main>
  );
}
