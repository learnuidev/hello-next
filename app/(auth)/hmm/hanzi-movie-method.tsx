/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import { NextIcon, ActorIcon as Header } from "@/components/ui/icons";

import { useSearchQuery } from "@/domain/search/search.queries";

import { useViewModeStore } from "./use-view-mode-store";
import { firstLesson } from "./first-lesson";

export function HanziMovieMethod() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const playerRef = useRef(null) as any;
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const onReady = useCallback(() => {
    // const timeToStart = 7 * 60 + 12.6
    playerRef.current.seekTo(0, "seconds");
  }, [playerRef]);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const lesson = firstLesson?.lessons[lessonIndex];

  const setResponse = (lessonId: string, value: any) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [lessonId]: value,
      };
    });

    setLessonIndex((idx) => idx + 1);
  };
  // const queryId = uuidv4()

  const { data: queryResult } = useSearchQuery({
    // queryId: queryId,
    query: firstLesson?.lessons[lessonIndex]?.gifSearchTerm,
  }) as any;
  const { data: queryResult2 } = useSearchQuery({
    // queryId: queryId,
    query: firstLesson?.lessons[lessonIndex]?.gifSearchTerm2,
  });
  const { data: queryResult3 } = useSearchQuery({
    // queryId: queryId,
    query: firstLesson?.lessons[lessonIndex]?.gifSearchTerm3,
  });

  const reset = () => {
    setAnswers({});

    setLessonIndex(0);
  };

  if (!lesson) {
    return (
      <div className="relative grow flex flex-col items-center">
        <Header className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
          Play
        </Header>

        <p>You have completed all the lessons</p>

        <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
          {JSON.stringify(answers)}
        </div>

        <div className="absolute bottom-0 py-8">
          <button
            onClick={reset}
            className="hover:shadow-blue-600 shadow-md px-4 py-1 rounded-full"
          >
            Complete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col items-center">
      <Header className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
        {lesson?.title}
      </Header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {lesson?.ideas
          .concat(queryResult?.data.slice(0, 1) || [])
          .map((idea: any) => {
            return (
              <button
                key={JSON.stringify(idea)}
                className=""
                onClick={() => {
                  setResponse(lesson.id, idea?.title);
                }}
              >
                <img
                  alt={idea.title}
                  src={idea?.images?.original?.url || idea?.url}
                  className="h-[200px]"
                />
              </button>
            );
          })}
      </div>

      {/* <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
        {queryResult?.data
          .slice(0, 1)
          .concat((queryResult2?.data || []).slice(0, 1))
          .concat((queryResult3?.data || []).slice(0, 1))
          .map(idea => {
            return (
              <button
                className=''
                onClick={() => {
                  setResponse(lesson.id, idea?.title)
                }}
              >
                <img
                  alt={idea.title}
                  src={idea?.images?.original?.url}
                  className='h-[200px]'
                />
              </button>
            )
          })}
      </div> */}

      <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
        {JSON.stringify(answers)}
      </div>

      <div className="py-32">
        <button
          className="hover:shadow-blue-600 shadow-md px-4 py-1 rounded-full"
          onClick={() => {
            setLessonIndex((idx) => idx + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
