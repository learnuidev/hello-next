import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSpring, animated, useTransition, config } from "@react-spring/web";

// import styles from "./test.css";

// import { useTransition, animated } from "react-spring";

import { useViewModeStore } from "./use-view-mode-store";
import {
  initCharacter,
  useCharacterStore,
  useCurrentStepStore,
} from "./nomad-method-store";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useAddAnswerMutation } from "@/domain/lesson/answer.mutations";
import { cleanString } from "@/data/convos/bm1/utils";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";

export function NomadMethod({ selectedId }: { selectedId: string }) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const playerRef = useRef() as any;
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const { data: learnedCharacters, isLoading: isCharactersLoading } =
    useListCharactersQuery();

  const addCharacterMutation = useAddCharacterMutation();

  const { data: sub_components } = useListSubComponentsQuery({
    componentId: selectedId,
  });

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

  const { data: components, isLoading } = useListComponentsQuery();

  const firstLesson = useMemo(
    () => components?.find((component: any) => component?.hanzi === selectedId),
    [components, selectedId]
  );

  // Current Lesson
  const lesson = useMemo(
    () => firstLesson?.steps[lessonIndex],
    [firstLesson, lessonIndex]
  );

  const { data: grammarAnalysis, isLoading: isGrammarAnalysisLoading } =
    useListGrammarsQuery(
      {
        sentenceId: lesson?.id,
        content: lesson?.hanzi,
      },
      {
        enabled: Boolean(lesson?.id) && Boolean(lesson?.hanzi),
        refetchOnWindowFocus: false,
        refetchOnFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const { data: answersList } = useListAnswersQuery({
    journeyId: firstLesson?.id,
  });

  // const queryId = uuidv4()

  const reset = () => {
    // setAnswers({});
    setCharacterState(initCharacter);

    setLessonIndex(0);
  };

  const addAnswerMutation = useAddAnswerMutation();

  const styles = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" },
  });

  // const styles = {} as any;

  // if (!lesson && !isLoading && !isCharactersLoading) {
  //   return (
  //     <div className="relative grow flex flex-col items-center">
  //       <p className="my-2 text-black dark:text-white text-3xl font-extrabold">
  //         Review
  //       </p>

  //       <p className="dark:text-gray-400">
  //         Lets quickly review before submitting
  //       </p>

  //       <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
  //         <code>
  //           <pre>{JSON.stringify(characterState, null, 2)}</pre>
  //         </code>
  //       </div>

  //       <div className="bottom-0 py-4">
  //         <button
  //           onClick={() => {
  //             addCharacterMutation
  //               ?.mutateAsync({
  //                 hanzi: firstLesson?.hanzi,
  //                 pinyin: firstLesson?.pinyin,
  //                 en: firstLesson?.en,
  //                 level: firstLesson?.level,
  //                 nomad: characterState?.nomad,
  //                 destination: characterState?.destination,
  //                 location: characterState?.location,
  //                 journeyId: firstLesson.id,
  //                 // todo | completed
  //                 status: "completed",
  //                 story: characterState?.story,
  //                 component: characterState?.component,
  //                 sub_components: [],
  //               })
  //               .then(() => {
  //                 reset();
  //               });
  //           }}
  //           className="hover:shadow-blue-600 shadow-md py-4 px-8 rounded bg-gray-800 text-2xl font-extralight"
  //         >
  //           Complete
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // return transitions((style, item) => (
  //   <animated.div style={style} className="text-white">
  //     {JSON.stringify(item, null, 2)}
  //   </animated.div>
  // ));

  console.log("GRAMMAR ANALYSIS", grammarAnalysis);

  return (
    <div>
      <animated.div
        className="grid test content-center my-8"
        style={styles}
        key={lesson?.id}
      >
        <div className="mx-4 md:mx-0 grow flex flex-col items-center transition ease-in-out">
          {lesson?.hanzi ? (
            <div className="">
              <h1 className="md:mx-12 my-2  text-black dark:text-gray-200 text-md md:text-xl">
                {lesson?.title}
              </h1>

              <h2
                onClick={() => {
                  setShowAnalysis(!showAnalysis);
                }}
                className="md:mx-12 my-2 text-black dark:text-gray-400 text-md md:text-lg"
              >
                {lesson?.hanzi}
              </h2>
              <h2 className="md:mx-12 my-2 text-black dark:text-gray-600 text-md md:text-lg">
                {lesson?.pinyin}
              </h2>
            </div>
          ) : (
            <h1 className="md:mx-48 my-2 md:mt-60 h-32 mb-8 text-black dark:text-white text-3xl">
              {lesson?.title}
            </h1>
          )}

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
            <div className=""></div>
          )}

          <div className="pt-48">
            <button
              className="hover:shadow-blue-600 shadow-md px-6 py-2 uppercase transition dark:text-gray-400"
              disabled={lessonIndex === 0}
              onClick={() => {
                setLessonIndex((idx: number) => idx - 1);
              }}
            >
              Previous
            </button>
            <button
              className="hover:shadow-blue-600 shadow-md px-6 py-2 uppercase transition dark:text-gray-400"
              onClick={() => {
                setLessonIndex((idx: number) => idx + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </animated.div>

      {showAnalysis ? (
        <div className="flex text-sm justify-center items-center space-x-2 px-12 text-gray-200 dark:text-gray-700">
          {(
            grammarAnalysis?.grammarAnalysis?.words ||
            grammarAnalysis?.grammarAnalysis ||
            []
          )?.map((grammar: any) => {
            const params = {
              hanzi: grammar?.hanzi,
              en: grammar?.english || grammar?.en || grammar?.title,
            };
            return (
              <span key={`${lesson?.id}-${params?.en}-${params?.hanzi}`}>
                {params?.en} ({params?.hanzi})
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
