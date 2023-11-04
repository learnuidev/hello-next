import { useCallback, useEffect, useRef, useState } from "react";

import { useViewModeStore } from "./use-view-mode-store";

const firstLesson = {
  title: "Characters #1-3: 一 yī, 二 èr, 三 sān",
  lessons: [
    {
      id: "0b",
      type: "info",
      componentId: "一",
      title: `一 is the Chinese character for the number "one."`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "0c",
      type: "info",
      componentId: "一",
      title: `It is used to represent the concept of singularity or the quantity "one" in numerical terms.`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "0d",
      type: "info",
      componentId: "一",
      title: `Additionally, it can be used in various contexts to indicate unity, simplicity, or as a general symbol of individuality or uniqueness.`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "0e",
      type: "info",
      componentId: "一",
      title: `In Chinese culture, it also holds symbolic significance, representing beginnings, originality, and the first step in a series of progression.`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "1",
      type: "component:create",
      componentId: "一",
      title: `Enter a Component for 一`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "2",
      type: "nomad:create",
      componentId: "一",
      title: `Enter a nomad for for -y`,
      suggestions: ["Yuvraj Singh", "Yogi Bear"],
    },
    {
      id: "3",
      type: "destination:create",
      componentId: "一",
      title: `Enter a destiantion for for -i`,
      suggestions: ["Delhi, India", "Goa, India"],
    },
    {
      id: "4",
      type: "location:create",
      componentId: "一",
      title: `Enter a location for -i4`,
      suggestions: ["Airport"],
    },
    {
      id: "4",
      type: "story:create",
      componentId: "一",
      title: `Create a story`,
      suggestions: ["Airport"],
    },
  ],
};

export function NomadMethod() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const playerRef = useRef() as any;
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const onReady = useCallback(() => {
    // const timeToStart = 7 * 60 + 12.6
    playerRef.current.seekTo(0, "seconds");
  }, [playerRef.current]);

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

  const reset = () => {
    setAnswers({});

    setLessonIndex(0);
  };

  if (!lesson) {
    return (
      <div className="relative grow ml-4 md:ml-16 flex flex-col items-center">
        <p className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
          Play
        </p>

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
    <div className="grow ml-4 md:ml-16 flex flex-col items-center">
      <h1 className="md:mx-48 my-2 md:my-16 text-black dark:text-white text-3xl">
        {lesson?.title}
      </h1>

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
