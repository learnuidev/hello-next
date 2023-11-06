import { useCallback, useEffect, useRef, useState } from "react";

import { useViewModeStore } from "./use-view-mode-store";
import { useCharacterStore, useCurrentStepStore } from "./nomad-method-store";

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
      key: "component",
      type: "component:create",
      componentId: "一",
      title: `Enter a Component for 一`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "2",
      key: "nomad",
      type: "nomad:create",
      componentId: "一",
      title: `Enter a nomad for for -y`,
      suggestions: ["Yuvraj Singh", "Yogi Bear"],
    },
    {
      id: "3",
      key: "destination",
      type: "destination:create",
      componentId: "一",
      title: `Enter a destiantion for for -i`,
      suggestions: ["Delhi, India", "Goa, India"],
    },
    {
      id: "4",
      key: "location",
      type: "location:create",
      componentId: "一",
      title: `Enter a location for -i4`,
      suggestions: ["Airport"],
    },
    {
      id: "5",
      key: "story",
      type: "story:create",
      componentId: "一",
      title: `Create a story`,
      suggestions: [""],
    },
  ],
};

export function NomadMethod() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const playerRef = useRef() as any;
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  // const [characterState, setCharacterState] = useState<any>({
  //   hanzi: "",
  //   pinyin: "",
  //   level: "",
  //   en: "",
  //   nomad: "",
  //   destination: "",
  //   location: "",
  //   journeyId: "",
  //   // todo | completed
  //   status: "",
  //   story: "",
  //   sub_components: "",
  // });

  const characterState = useCharacterStore(
    (state: any) => state.character
  ) as any;
  const setCharacterState = useCharacterStore(
    (state: any) => state.setCharacter
  ) as any;

  const onReady = useCallback(() => {
    // const timeToStart = 7 * 60 + 12.6
    playerRef.current.seekTo(0, "seconds");
  }, [playerRef.current]);

  // const [lessonIndex, setLessonIndex] = useState(0);

  const lessonIndex = useCurrentStepStore((state: any) => state?.currentStepId);
  const setLessonIndex = useCurrentStepStore(
    (state: any) => state?.setCurrentStepId
  );
  const [answers, setAnswers] = useState({});

  const lesson = firstLesson?.lessons[lessonIndex];

  const setResponse = (lessonId: string, value: any) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [lessonId]: value,
      };
    });

    setLessonIndex((idx: any) => idx + 1);
  };
  // const queryId = uuidv4()

  const reset = () => {
    setAnswers({});

    setLessonIndex(0);
  };

  console.log("CHARACTER STATE", characterState);

  if (!lesson) {
    return (
      <div className="relative grow ml-4 md:ml-16 flex flex-col items-center">
        <p className="my-2 text-black dark:text-white text-3xl font-extrabold">
          Review
        </p>

        <p className="dark:text-gray-400">
          Lets quickly review before submitting
        </p>

        <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
          <code>
            <pre>{JSON.stringify(characterState, null, 2)}</pre>
          </code>
        </div>

        <div className="bottom-0 py-4">
          <button
            onClick={reset}
            className="hover:shadow-blue-600 shadow-md py-4 px-8 rounded bg-gray-800 text-2xl font-extralight"
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

      {lesson && lesson?.key && (
        <textarea
          autoFocus
          onChange={(event) => {
            console.log("KEY", lesson.key);

            const newState = {
              ...characterState,
              [lesson?.key]: event?.target.value,
            };

            console.log("NEW STA", newState);

            setCharacterState(newState);
          }}
          placeholder={lesson?.suggestions?.join(", ")}
          className="text-center border-solid border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
          value={characterState?.[lesson?.key] as any}
        />
      )}

      <div className="py-32">
        <button
          className="hover:shadow-blue-600 shadow-md px-4 py-1 rounded-full"
          onClick={() => {
            setLessonIndex((idx: number) => idx + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
