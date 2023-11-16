import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSpring, animated, useTransition, config } from "@react-spring/web";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./loading_animation.json";

import yay from "./yay.json";

import { useViewModeStore } from "./use-view-mode-store";
import { initCharacter, useCharacterStore } from "./nomad-method-store";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useAddAnswerMutation } from "@/domain/lesson/answer.mutations";
import { cleanString } from "@/data/convos/bm1/utils";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";
import { useAddStepsMutation } from "@/domain/lesson/step.mutations";

export function NomadMethod({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose?: any;
}) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [showYay, setShowYay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewSucessBanner, setViewSuccessBanner] = useState(false);
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

  const { data: components, isLoading, isFetching } = useListComponentsQuery();

  const firstLesson = useMemo(
    () => components?.find((component: any) => component?.hanzi === selectedId),
    [components, selectedId]
  );

  const addStepsMutation = useAddStepsMutation({
    onSuccess: () => {
      alert("yo");
      setViewSuccessBanner(true);
    },
  });

  console.log("FIRST LESSON", firstLesson);

  // Current Lesson
  const lesson = useMemo(
    () => firstLesson?.steps?.[lessonIndex],
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

  const LessonAddSuccessView = () => {
    return (
      <div className="relative content-center md:my-48 my-8">
        {showYay && (
          <Lottie
            className="z-10 inset-0 top-40 fixed h-80"
            animationData={yay}
            loop={false}
            onComplete={() => {
              setShowYay(false);
            }}
          />
        )}

        <div>
          <animated.div
            className="grid test content-center"
            style={styles}
            key={lesson?.id}
          >
            <div>
              <div className="h-32 mx-4 md:mx-0 grow flex flex-col items-center transition ease-in-out">
                <h1 className="z-50 md:mx-48 my-2 mb-8 text-black dark:text-white text-3xl">
                  Lesson successfully created for: {selectedId}
                </h1>
              </div>

              <div className="flex items-center w-full justify-center">
                <button
                  className="z-50"
                  onClick={() => {
                    setViewSuccessBanner(false);
                  }}
                >
                  View Lesson
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    );
  };

  if (viewSucessBanner) {
    return <LessonAddSuccessView />;
  }

  if (addStepsMutation?.isLoading || isFetching) {
    // load lottile files here
    return (
      <div className="content-center my-64">
        <Lottie
          className="h-60"
          // animationData={rocketAnimation}
          animationData={groovyWalkAnimation}
        />
      </div>
    );
  }

  const NoLessonView = () => {
    return (
      <>
        <div className="flex justify-between items-center w-full px-4 md:px-12 md:my-2">
          {onClose ? (
            <button
              className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
              onClick={() => {
                onClose();
              }}
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </button>
          ) : (
            <Link
              className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
              href="/insights"
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </Link>
          )}
        </div>

        <div>
          <animated.div
            className="grid test content-center md:my-48 my-8"
            style={styles}
            key={lesson?.id}
          >
            <div>
              <div className="h-32 mx-4 md:mx-0 grow flex flex-col items-center transition ease-in-out">
                <h1 className="md:mx-48 my-2 mb-8 text-black dark:text-white text-3xl">
                  No lesson exists for: {selectedId}
                </h1>
              </div>

              <div className="flex items-center w-full justify-center">
                <button
                  disabled={addStepsMutation?.isLoading}
                  className={addStepsMutation?.isLoading ? "text-gray-400" : ""}
                  onClick={() => {
                    addStepsMutation
                      ?.mutateAsync({
                        componentId: firstLesson?.id,
                      })
                      .then((err) => {
                        setShowYay(true);
                        setViewSuccessBanner(true);
                        // alert("Success");
                      })
                      .catch((err) => {
                        alert("Err");
                      });
                  }}
                >
                  {addStepsMutation?.isLoading ? "Creating" : "Create one"}
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      </>
    );
  };

  // return <div>

  //   <code>
  //     <pre>
  //       {JSON.stringify(firstLesson, null, 2)}
  //     </pre>
  //   </code>
  // </div>

  if (
    !firstLesson?.steps?.length ||
    !firstLesson?.steps?.filter((step: any) => Boolean(step?.hanzi))?.length
  ) {
    return <NoLessonView />;
  }

  const ComponentReview = () => {
    return (
      <div className="relative mt-32 grow flex flex-col items-center">
        <p className="my-2 text-black dark:text-white text-3xl font-extrabold">
          Review
        </p>

        <p className="dark:text-gray-400">
          Lets quickly review before submitting
        </p>

        <div className="mt-16 mx-8 md:mx-72 text-center space-y-2">
          <p className="text-gray-300">
            <a
              role="a"
              href={`https://www.youtube.com/results?search_query=${characterState?.nomad}`}
              target="_blank"
            >
              {characterState?.nomad} @{" "}
            </a>
            <span className="font-bold">
              {characterState?.destination}, {characterState?.location}
            </span>
          </p>

          <p className="pt-4 pb-16 text-gray-300 text-lg font-light">
            {characterState.story}
          </p>
        </div>

        {/* <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
          <code>
            <pre>{JSON.stringify(characterState, null, 2)}</pre>
          </code>
        </div> */}

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
            className="hover:shadow-blue-600 shadow-md py-2 px-8 rounded bg-gray-800 text-md font-extralight"
          >
            Complete
          </button>
        </div>
      </div>
    );
  };

  if (!lesson && characterState?.story) {
    return <ComponentReview />;
  }

  const ComponentForm = () => {
    return (
      <>
        <div className="flex justify-between items-center w-full px-4 md:px-12 md:my-2">
          {onClose ? (
            <button
              className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
              onClick={() => {
                onClose();
              }}
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </button>
          ) : (
            <Link
              className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
              href="/insights"
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </Link>
          )}

          <div></div>

          <div className="flex items-center w-full justify-center">
            <button
              className="hover:shadow-blue-600 shadow-md text-xl px-6 py-2 uppercase transition dark:text-gray-400"
              disabled={lessonIndex === 0}
              onClick={() => {
                setLessonIndex((idx: number) => idx - 1);
              }}
            >
              {/* Previous */}

              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="hover:shadow-blue-600 shadow-md text-xl px-6 py-2 uppercase transition dark:text-gray-400"
              onClick={() => {
                setLessonIndex((idx: number) => idx + 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        <div>
          <animated.div
            className="grid test content-center md:my-48 my-8"
            style={styles}
            key={lesson?.id}
          >
            <div className="relative">
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
                  <h1 className="md:mx-48 my-2 mb-8 text-black dark:text-white text-3xl">
                    {lesson?.title}
                  </h1>
                )}

                {lesson && lesson?.key ? (
                  lesson?.title === "Create a story" ? (
                    <textarea
                      autoFocus
                      onChange={(event) => {
                        const newState = {
                          ...characterState,
                          [lesson?.key]: event?.target.value,
                        };

                        setCharacterState(newState);
                      }}
                      placeholder={lesson?.suggestions?.join(", ")}
                      className="text-center border-solid border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
                      value={characterState?.[lesson?.key] as any}
                    />
                  ) : (
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
                      className="text-center border-solid h-12 border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
                      value={characterState?.[lesson?.key] as any}
                    />
                  )
                ) : (
                  <div className=""></div>
                )}
              </div>

              {lesson?.title === "Create a story" ? (
                <div className="mt-8">
                  <h1 className="mb-2 text-center dark:text-gray-600 text-xs font-bold">
                    Sub Components
                  </h1>

                  <div className="flex text-sm justify-center items-center space-x-2 px-12 text-gray-200 dark:text-gray-400">
                    {sub_components?.map((grammar: any) => {
                      const params = {
                        hanzi: grammar?.hanzi,
                        en: grammar?.english || grammar?.en || grammar?.title,
                      };
                      return (
                        <span
                          key={`${lesson?.id}-${params?.en}-${params?.hanzi}`}
                        >
                          {params?.en} ({params?.hanzi})
                        </span>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </animated.div>

          {showAnalysis ? (
            <div className="flex text-sm justify-center items-center space-x-2 px-12 text-gray-200 dark:text-gray-400">
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
      </>
    );
  };

  return <ComponentForm />;
}
