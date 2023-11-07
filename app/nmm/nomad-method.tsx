import { useCallback, useEffect, useRef, useState } from "react";

import { useViewModeStore } from "./use-view-mode-store";
import {
  initCharacter,
  useCharacterStore,
  useCurrentStepStore,
} from "./nomad-method-store";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export function NomadMethod({ selectedId }: { selectedId: string }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const playerRef = useRef() as any;
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const { data: learnedCharacters, isLoading: isCharactersLoading } =
    useListCharactersQuery();

  const addCharacterMutation = useAddCharacterMutation();

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

  const [lessonIndex, setLessonIndex] = useState(0);

  // const lessonIndex = useCurrentStepStore((state: any) => state?.currentStepId);
  // const setLessonIndex = useCurrentStepStore(
  //   (state: any) => state?.setCurrentStepId
  // );
  const [answers, setAnswers] = useState({});

  const { data: components, isLoading } = useListComponentsQuery();

  const firstLesson = components?.find(
    (component: any) => component?.hanzi === selectedId
  );

  const lesson = firstLesson?.steps[lessonIndex];

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
    // setAnswers({});
    setCharacterState(initCharacter);

    setLessonIndex(0);
  };

  if (!lesson && !isLoading && !isCharactersLoading) {
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
            onClick={() => {
              addCharacterMutation
                ?.mutateAsync({
                  hanzi: firstLesson?.hanzi,
                  pinyin: firstLesson?.pinyin,
                  en: firstLesson?.en,
                  level: firstLesson?.level,
                  nomad: characterState?.nomad,
                  destination: characterState?.destination,
                  location: characterState?.location,
                  journeyId: firstLesson.id,
                  // todo | completed
                  status: "completed",
                  story: characterState?.story,
                  component: characterState?.component,
                  sub_components: [],
                })
                .then(() => {
                  reset();
                });
            }}
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
      <h1 className="md:mx-48 my-2 md:mt-60 h-32 mb-8 text-black dark:text-white text-3xl">
        {lesson?.title}
      </h1>

      {lesson && lesson?.key ? (
        <input
          autoFocus
          onChange={(event) => {
            const newState = {
              ...characterState,
              [lesson?.key]: event?.target.value,
            };

            setCharacterState(newState);
          }}
          placeholder={lesson?.suggestions?.join(", ")}
          className="text-center border-solid border-b-2 h-16 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
          value={characterState?.[lesson?.key] as any}
        />
      ) : (
        <div className="h-16"></div>
      )}

      <div className="py-24">
        <button
          className="hover:shadow-blue-600 shadow-md px-6 py-2 uppercase transition"
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
