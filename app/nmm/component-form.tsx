import { useCallback, useMemo, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import { useViewModeStore } from "./use-view-mode-store";
import { initCharacter, useCharacterStore } from "./nomad-method-store";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";

import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faRocket,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";
import { useAddStepsMutation } from "@/domain/lesson/step.mutations";
import { Editor } from "@/components/Editor";

export const ComponentForm = ({
  selectedId,
  onClose,
  setShowYay,
  setViewSuccessBanner,
  lessonIndex,
  setLessonIndex,
}: {
  selectedId: string;
  onClose: any;
  setShowYay: any;
  setViewSuccessBanner: any;
  lessonIndex: number;
  setLessonIndex: any;
}) => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const { data: sub_components } = useListSubComponentsQuery({
    componentId: selectedId,
  });

  const characterState = useCharacterStore(
    (state: any) => state.character
  ) as any;
  const setCharacterState = useCharacterStore(
    (state: any) => state.setCharacter
  ) as any;

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

  const styles = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" },
  });
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
          <FontAwesomeIcon icon={faRocket} />
        </button>
      </div>

      <div>
        <animated.div
          className="grid test content-center my-16 h-80"
          style={styles}
          key={lesson?.id}
        >
          <div className="relative">
            <div className="mx-4 md:mx-0 grow flex flex-col items-center transition ease-in-out">
              {lesson?.hanzi ? (
                <div className="md:my-24">
                  <h1 className="md:mx-12 my-2 text-black dark:text-gray-200 text-md md:text-xl">
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
                <h1 className="md:my-24 md:mx-48 my-2 mb-8 text-black dark:text-white text-xl md:text-3xl">
                  {lesson?.title}
                </h1>
              )}

              {lesson && lesson?.key ? (
                lesson?.title === "Create a story" ? (
                  <div className="w-full items-center flex flex-col">
                    <p className="text-gray-300">
                      <a
                        role="a"
                        href={`https://www.youtube.com/results?search_query=${characterState?.nomad}`}
                        target="_blank"
                      >
                        {characterState?.nomad} @{" "}
                      </a>
                      <span className="font-bold">
                        {characterState?.destination},{" "}
                        {characterState?.location}
                      </span>
                    </p>

                    <Editor
                      className="text-start my-8"
                      id="story"
                      content={characterState?.[lesson?.key] as any}
                      onUpdate={(val: any) => {
                        const newState = {
                          ...characterState,
                          [lesson?.key]: val,
                        };

                        setCharacterState(newState);
                      }}
                    />
                  </div>
                ) : (
                  // <textarea
                  //   autoFocus
                  //   onChange={(event) => {
                  //     const newState = {
                  //       ...characterState,
                  //       [lesson?.key]: event?.target.value,
                  //     };

                  //     setCharacterState(newState);
                  //   }}
                  //   placeholder={lesson?.suggestions?.join(", ")}
                  //   className="text-center border-solid border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
                  //   value={characterState?.[lesson?.key] as any}
                  // />
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
              <div className="h-20 my-8">
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
            ) : (
              <div className="h-20"></div>
            )}
          </div>
        </animated.div>

        <div className="flex items-center w-full justify-center">
          <button
            className="hover:shadow-blue-600 z-50 shadow-md text-xl px-6 py-2 uppercase transition dark:text-gray-400"
            disabled={lessonIndex === 0}
            onClick={() => {
              setLessonIndex((idx: number) => idx - 1);
            }}
          >
            {/* Previous */}

            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="hover:shadow-blue-600 z-50 shadow-md text-xl px-6 py-2 uppercase transition dark:text-gray-400"
            onClick={() => {
              setLessonIndex((idx: number) => idx + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {showAnalysis ? (
          <div
            className={`mx-4 justify-center items-center md:mx-64 my-8 grid   ${
              (
                grammarAnalysis?.grammarAnalysis?.words ||
                grammarAnalysis?.grammarAnalysis
              )?.length < 5
                ? "grid-cols-3"
                : "grid-cols-5"
            } gap-y-8 text-sm px-12 text-gray-200 dark:text-gray-400`}
          >
            {(
              grammarAnalysis?.grammarAnalysis?.words ||
              grammarAnalysis?.grammarAnalysis ||
              []
            )
              ?.filter((grammar: any) => grammar?.hanzi?.length < 10)
              ?.map((grammar: any) => {
                const params = {
                  hanzi: grammar?.hanzi,
                  en: grammar?.english || grammar?.en || grammar?.title,
                  pinyin: grammar?.pinyin,
                };
                return (
                  <div
                    className="w-full flex flex-row space-x-2"
                    key={`${lesson?.id}-${params?.en}-${params?.hanzi}`}
                  >
                    {/* {JSON.stringify(params, null, 2)} */}

                    <div className="w-full flex flex-col items-center justify-start">
                      <div className="flex flex-row space-x-2">
                        <a
                          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                            params?.hanzi
                          )}`}
                          target="_blank"
                        >
                          {params?.hanzi}
                        </a>
                        <p>{params?.pinyin}</p>
                      </div>
                      <p className="text-xs">{params?.en}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
    </>
  );
};
