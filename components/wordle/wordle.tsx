"use client";

// @ts-ignore

import { useState, useEffect } from "react";

import { useAddAnswerMutation } from "@/domain/lesson/answer.mutations";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBadgeCheck,
  faTick,
} from "@fortawesome/pro-thin-svg-icons";
import { useListContentsQuery } from "@/domain/content/content.queries";
import Link from "next/link";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

function GameTile(props: any) {
  const { letter } = props;
  return (
    <div className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold uppercase">
      {letter}
    </div>
  );
}

function GameRow(props: any) {
  const { guess } = props;
  console.log("GUESS", guess);

  return (
    <div className="flex justify-center mb-1">
      {guess.split("").map((letter: string, idx: number) => {
        return <GameTile letter={letter} key={`${idx}-${letter}-${idx}`} />;
      })}
      {/* <input value={guess} /> */}
    </div>
  );
}

export function Wordle() {
  const searchParams = useSearchParams();

  const lessonIndexParams = searchParams.get("step") || null;
  const params = useParams() as {
    lessonId: string;
    "phrase-id": string;
    "content-id": string;
  };

  const lessonId = params["content-id"];

  const { data: answers } = useListAnswersQuery(
    { journeyId: lessonId },
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;

  const phraseId = params?.["phrase-id"]
    ? decodeURIComponent(params?.["phrase-id"])
    : null;

  const router = useRouter();
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [_lessonId, setLessonId] = useState(
    lessonId || params?.["lessonId"] || "lesson11"
  );

  const [lessonIndex, setTranscriptionId] = useState<any>(() => {
    const currentLesson = contents?.find(
      (lesson: any) => lesson?.id === _lessonId
    );

    const firstPhraseId =
      currentLesson?.transcriptions?.[0]?.id ||
      currentLesson?.transcriptions?.[0]?.hanzi;

    // 1. first find the phrase id - if found then return
    // 2. if not found then find the first phrase of the current lesson and return it
    return (phraseId || firstPhraseId) as any;
  });
  // const [secret, setSecret] = useState("我爱中文啊");

  const addAnswerMutation = useAddAnswerMutation();

  const currentLesson = contents?.find(
    (lesson: any) => lesson?.id === _lessonId
  );

  const currentPhrase = currentLesson?.transcriptions?.find(
    (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
  );

  useEffect(() => {
    if (lessonIndexParams !== null) {
      const currentLesson = contents?.find(
        (lesson: any) => lesson?.id === _lessonId
      );

      // setTranscriptionId(lessonIndexParams);

      // @ts-ignore
      const nextId = currentLesson?.transcriptions?.[lessonIndexParams - 1];

      setTranscriptionId(nextId?.id || nextId?.hanzi);

      return;
      // return null;
    } else {
      const currentLesson = contents?.find(
        (lesson: any) => lesson?.id === _lessonId
      );

      const answerHanzis = answers?.map((answer: any) => answer?.hanzi);

      const firstUnanswered = currentLesson?.transcriptions?.filter(
        (transcription: any) => {
          return !answerHanzis?.includes(transcription?.hanzi);
        }
      )[0];

      if (firstUnanswered) {
        console.log("FIRST ANSWERED", firstUnanswered);
        // const firstUnansweredIndex
        const currentLessonStep =
          currentLesson?.transcriptions?.findIndex(
            (lesson: any) =>
              (lesson?.id || lesson?.hanzi) === firstUnanswered?.hanzi
          ) + 1;

        router.push(
          `/convos/${params?.["lessonId"] || _lessonId}?step=${currentLessonStep !== 0 ? currentLessonStep : currentLessonStep + 1}`
        );
      }
    }
  }, [contents, _lessonId, answers, lessonIndexParams, router, params]);

  const totalLessons = currentLesson?.transcriptions?.length;

  const secret = currentPhrase?.hanzi || currentPhrase?.input;

  // 1. game state
  const [guessHistory, setGuessHistory] = useState<any>({
    0: [],
    1: [],
    2: [],
  });

  console.log("GUESS HISTRT", guessHistory);

  const currentGuessHistory = (
    guessHistory?.[lessonIndex as string] || []
  )?.filter((hist: string) => {
    return (currentPhrase?.hanzi || currentPhrase?.input)?.includes(hist);
  });

  // 3.1 handles submittion
  const handleEnter = () => {
    // check if the currentGuess has 5 chars
    const guessTrimmed = currentGuess;

    const historyTrimmed = [...currentGuessHistory, guessTrimmed]?.reduce(
      (acc, curr) => `${acc}${curr}`,
      ""
    );

    // console.log("HISTORY", historyTrimmed);
    // console.log("HISTORY", currentGuess);
    // console.log("HISTORY SEC", secret);

    // console.log("LESSON INDEX", lessonIndex);

    if (secret?.trim() === guessTrimmed?.trim() || secret === historyTrimmed) {
      // alert("You win");

      setGameStatus("win");
      setGuessHistory((prevHistory: any) => {
        return {
          ...prevHistory,
          [lessonIndex]: currentGuessHistory.concat(guessTrimmed as any),
        };
      });
    } else if (guessHistory?.[lessonIndex as string]?.length >= 5) {
      alert("You lose");
      setGameStatus("lost");
    } else {
      console.log("YOOOO", guessTrimmed);
      // 1. add the current guess to guessHistory
      setGuessHistory((prevHistory: any) => {
        return {
          ...prevHistory,
          [lessonIndex]: (currentGuessHistory || []).concat(
            guessTrimmed as any
          ),
        };
      });

      console.log("YOOOO");

      // 2. reset currentGuess
      setCurrentGuess("");
    }
  };

  const handleKeyup = (event: any) => {
    if (event.key === "Enter") {
      handleEnter();
    } else {
      // handleChar();
      setCurrentGuess(event.target.value);
    }
  };

  // const empties = Array(5 - currentGuessHistory.length).fill("     ");

  const phraseItem =
    currentPhrase?.hanzi || currentPhrase?.pinyin || currentPhrase?.input;

  // if (phraseItem?.length > 20) {
  //   return (
  //     <div className="text-center my-32">
  //       <h1 className="text-2xl font-semibold">Phrase too long</h1>

  //       <p className="text-xs my-8 text-center px-80 text-gray-400 font-light">
  //         {phraseItem}
  //       </p>
  //       <p className="text-gray-500 font-extralight">
  //         Sentence must be 16 characters max
  //       </p>
  //     </div>
  //   );
  // }

  const currentLessonStep =
    // @ts-ignore
    currentLesson?.transcriptions?.findIndex(
      (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
    ) + 1;

  // const hasAnswered =

  console.log("ANSWERS", answers);

  const FinishButton = () => {
    return (
      <div className="text-center transition">
        <button
          onClick={() => {
            const guessTrimmed = currentGuess;
            const historyTrimmed = [
              ...currentGuessHistory,
              guessTrimmed,
            ]?.reduce((acc, curr) => `${acc}${curr}`, "");

            return addAnswerMutation

              .mutateAsync({
                // @ts-ignore
                hanzi: secret,
                answer: historyTrimmed,
                lessonId: _lessonId,
                // @ts-ignore
                phraseId: currentPhrase?.id,
                status: "incorrect",
                guessHistory: guessHistory?.[lessonIndex as string],
              })
              .then((res) => {
                const lessonIdx = contents?.findIndex(
                  (lesson: any) => lesson?.id === lessonIndex
                );

                if (lessonIdx !== -1) {
                  // @ts-ignore
                  const nextId = contents?.[lessonIdx + 1];

                  nextId?.id && setTranscriptionId(nextId?.id);
                } else {
                  setGameStatus("finish");
                }
                // setTranscriptionId((prevIndex) => prevIndex + 1);
                setCurrentGuess("");
                setGameStatus("");
              });
          }}
        >
          Continue
        </button>
      </div>
    );
  };

  const WinButton = () => {
    return (
      <div className="text-center transition mt-8">
        <button
          onClick={() => {
            const guessTrimmed = currentGuess;
            const historyTrimmed = [
              ...currentGuessHistory,
              guessTrimmed,
            ]?.reduce((acc, curr) => `${acc}${curr}`, "");

            const goToNextChallenge = () => {
              const currentPhraseIndex =
                currentLesson?.transcriptions?.findIndex(
                  (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
                );

              console.log("CURRENT PHASE INDEX", currentPhraseIndex);

              if (currentPhraseIndex !== -1) {
                const nextId =
                  // @ts-ignore
                  currentLesson?.transcriptions?.[currentPhraseIndex + 1];

                console.log("NEXT ID", nextId);
                router.push(
                  // @ts-ignore
                  `/convos/${params?.["lessonId"] || _lessonId}?step=${currentPhraseIndex + 2}`
                );

                // setTranscriptionId(nextId?.id || nextId?.hanzi);
              } else {
                setGameStatus("finish");
              }

              setCurrentGuess("");
              setGameStatus("");
            };

            return addAnswerMutation

              .mutateAsync({
                // @ts-ignore
                hanzi: secret,
                answer: historyTrimmed,
                lessonId: _lessonId,
                // @ts-ignore
                phraseId: currentPhrase?.id,
                status: "correct",
                guessHistory: guessHistory?.[lessonIndex as string],
              })
              .then((res) => {
                goToNextChallenge();
              });
          }}
        >
          {addAnswerMutation?.isLoading ? "Loading 。。。" : "Continue"}
        </button>
      </div>
    );
  };

  const PreviousLessonButton = () => {
    return (
      <button
        className="col-span-1 hidden md:block md:text-2xl dark:text-gray-600"
        disabled={currentLessonStep === 1}
        onClick={() => {
          const currentLesson = contents?.find(
            (lesson: any) => lesson?.id === _lessonId
          );

          const currentPhrase = currentLesson?.transcriptions?.find(
            (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
          );

          const currentPhraseIndex = currentLesson?.transcriptions?.findIndex(
            (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
          );

          console.log("CURRENT PHRASE INDEX", currentPhraseIndex);

          if (currentPhraseIndex !== -1) {
            const nextId =
              // @ts-ignore
              currentLesson?.transcriptions?.[currentPhraseIndex - 1];

            setTranscriptionId(nextId?.id || nextId?.hanzi);
          } else {
          }

          setCurrentGuess("");
          setGameStatus("");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  };

  const NextLessonButton = () => {
    return (
      <button
        className="col-span-1 hidden md:block md:text-2xl dark:text-gray-600"
        onClick={() => {
          const currentLesson = contents?.find(
            (lesson: any) => lesson?.id === _lessonId
          );

          const currentPhrase = currentLesson?.transcriptions?.find(
            (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
          );
          const currentPhraseIndex = currentLesson?.transcriptions?.findIndex(
            (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
          );

          console.log("CURRENT PHRASE ID", currentPhraseIndex);

          if (currentPhraseIndex !== -1) {
            const nextId =
              // @ts-ignore
              currentLesson?.transcriptions?.[currentPhraseIndex + 1];

            console.log("NEXT ID", nextId);

            // @ts-ignore
            console.log("next id", nextId.hanzi);

            setTranscriptionId(nextId?.id || nextId?.hanzi);

            if (params?.["lessonId"]) {
              router.push(
                `/convos/${params?.["lessonId"] || _lessonId}/${nextId?.id}`
              );
            }
          } else {
            setGameStatus("finish");
          }

          setCurrentGuess("");
          setGameStatus("");
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    );
  };

  return (
    <div>
      {/* <header className="flex w-80 mx-auto mt-10 mb-8">
        <h1 className={"grow font-bold text-center text-sm text-gray-300"}>
          {" "}
          <span>拼音猜成语</span>{" "}
          <span className="text-gray-200">[worldle]</span>{" "}
        </h1>
      </header> */}

      <main className="py-12 flex items-center justify-center flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-32">
          {answers?.find(
            (answer: any) =>
              (answer?.hanzi || answer?.input) ===
              (currentPhrase?.hanzi || currentPhrase?.input)
          ) ? (
            <span className="text-yellow-400">
              <FontAwesomeIcon className="text-2xl" icon={faBadgeCheck} />
            </span>
          ) : (
            <span className="text-black">
              <FontAwesomeIcon className="text-2xl" icon={faBadgeCheck} />
            </span>
          )}
          <h2 className="text-gray-400 font-extralight text-lg md:text-2xl">
            Write the following sentence in{" "}
            <span className="text-yellow-400">汉子</span>
          </h2>

          <div className="text-md md:text-2xl font-extralight text-gray-500">
            {currentLessonStep} / {totalLessons}
          </div>
        </div>
        <p></p>

        <div className="grid grid-cols-12 w-full px-4 md:px-32 justify-end items-center">
          <PreviousLessonButton />
          <div className="col-span-10">
            <div className="mt-16 text-center space-y-2 mx-0 lg:mx-32">
              <p className="text-lg text-gray-400 dark:text-gray-500 font-extralight">
                {currentPhrase?.en}
              </p>
              <Link
                target="_blank"
                // @ts-ignore
                href={`/nmm/${currentPhrase?.hanzi || currentPhrase?.input}${currentPhrase?.lang ? `?lang=${currentPhrase?.lang}` : ""}`}
                className="text-2xl  text-gray-700 font-extralight dark:text-gray-300"
              >
                {currentPhrase?.hanzi || currentPhrase?.input}
              </Link>
              {/* <p className="text-lg  text-gray-700 font-extralight dark:text-gray-700">
                {currentPhrase?.pinyin || currentPhrase?.roman}
              </p> */}
            </div>

            <div className="flex justify-center w-full my-16 flex-col items-center">
              <input
                autoFocus
                disabled={gameStatus === "win"}
                className="text-center h-14 border-solid border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
                value={currentGuess}
                onKeyDown={(event: any) => {
                  if (event.key === "ArrowUp") {
                    const guessHistoryItem =
                      guessHistory?.[lessonIndex as string];
                    const lastGuess =
                      guessHistoryItem?.[guessHistoryItem?.length - 1];

                    setCurrentGuess(lastGuess);
                    return null;
                  }

                  if (event.key === "Enter") {
                    handleEnter();
                  } else {
                    setCurrentGuess(event.target.value);
                  }
                }}
                onChange={(event) => {
                  handleKeyup(event);
                }}
              />
              {gameStatus === "win" && <WinButton />}
            </div>
          </div>

          <NextLessonButton />
        </div>

        <div className="w-80">
          {currentGuessHistory.map((guess: any, idx: any) => {
            return <GameRow key={`${guess}-${idx}`} guess={guess} />;
          })}
        </div>
      </main>

      {gameStatus === "lost" && (
        <>
          <div className="text-center text-2xl">
            <GameRow guess={secret} />
          </div>

          <div className="text-center transition mt-8">
            <button
              onClick={() => {
                const guessTrimmed = currentGuess;
                const historyTrimmed = [
                  ...currentGuessHistory,
                  guessTrimmed,
                ]?.reduce((acc, curr) => `${acc}${curr}`, "");

                return addAnswerMutation
                  .mutateAsync({
                    // @ts-ignore
                    hanzi: secret,
                    answer: historyTrimmed,
                    lessonId: _lessonId,
                    // @ts-ignore
                    phraseId: currentPhrase?.id,
                    status: "incorrect",
                    guessHistory: guessHistory?.[lessonIndex as string],
                  })
                  .then((res) => {
                    const lessonIdx = contents?.findIndex(
                      (lesson: any) => lesson?.id === lessonIndex
                    );

                    if (lessonIdx !== -1) {
                      // @ts-ignore
                      const nextId = contents?.[lessonIdx + 1];

                      nextId?.id && setTranscriptionId(nextId?.id);
                    } else {
                      setGameStatus("finish");
                    }

                    setCurrentGuess("");
                    setGameStatus("");
                    setGuessHistory({});
                  });
              }}
            >
              Retry
            </button>
          </div>
        </>
      )}

      {gameStatus === "finish" && <FinishButton />}
    </div>
  );
}
