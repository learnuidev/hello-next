"use client";

import { useState, useEffect } from "react";

import { course1 } from "@/data/convos/bm1/index";
import { useAddAnswerMutation } from "@/domain/lesson/answer.mutations";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

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
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [lessonId, setLessonId] = useState("lesson11");
  const [lessonIndex, setLessonIndex] = useState("你好");
  // const [secret, setSecret] = useState("我爱中文啊");

  const addAnswerMutation = useAddAnswerMutation();

  const { data: answers } = useListAnswersQuery(
    {
      journeyId: lessonId,
    },
    {
      onSuccess: (data: any) => {
        console.log("SUCCESS yo", data);

        const correctIds = currentLesson?.lessons
          // ?.map((item: any) => item)
          ?.filter((lesson: any) =>
            Boolean(
              data?.find(
                (item: any) =>
                  item?.phraseId === lesson?.id && item.status === "correct"
              )
            )
          )
          ?.map((item: any) => item?.id);

        console.log("CORRECT IDS", correctIds);

        const nextId = currentLesson?.lessons?.find(
          (lesson: any) => !correctIds?.includes(lesson?.id)
        );
        console.log("CURRENT LESSON YO", nextId);

        if (nextId?.id) {
          setLessonIndex(nextId?.id);
        } else {
          setGameStatus("finish");

          // const lesson = course1?.lesson
          const currentLessonIndex = course1?.lessons?.findIndex(
            (lesson: any) => lesson?.id === lessonId
          );

          const nextLesson = course1?.lessons?.[currentLessonIndex + 1];

          if (nextLesson) {
            setLessonId(nextLesson?.id);
          }
        }
      },
    }
  );

  const currentLesson = course1?.lessons?.find(
    (lesson: any) => lesson?.id === lessonId
  );

  const currentPhrase = currentLesson?.lessons?.find(
    (lesson: any) => lesson?.id === lessonIndex
  );

  const cleanString = (str: string) => {
    return str
      ?.split("")
      ?.filter(Boolean)
      .join("")
      ?.trim()
      ?.replaceAll("？", "")
      ?.replaceAll("！", "")
      ?.replaceAll("！ ", "")
      ?.replaceAll(" ", "")
      ?.replaceAll("，", "")
      ?.replaceAll("。", "")
      ?.replaceAll("!", "")
      ?.replaceAll(" ", "")
      ?.replaceAll(",", "")
      ?.replaceAll(".", "")
      ?.replaceAll("?", "");
  };

  const secret = cleanString(currentPhrase?.hanzi);

  console.log({ secret: secret?.replaceAll(" ", "") });

  // 1. game state
  const [guessHistory, setGuessHistory] = useState<any>({
    0: [],
    1: [],
    2: [],
  });

  const currentGuessHistory = (
    guessHistory?.[lessonIndex as string] || []
  )?.filter((hist: string) => {
    return cleanString(currentPhrase?.hanzi)?.includes(hist);
  });

  // 3.1 handles submittion
  const handleEnter = () => {
    // check if the currentGuess has 5 chars
    const guessTrimmed = cleanString(currentGuess);

    const historyTrimmed = [...currentGuessHistory, guessTrimmed]?.reduce(
      (acc, curr) => `${acc}${curr}`,
      ""
    );
    if (secret === guessTrimmed || secret === historyTrimmed) {
      // alert("You win");

      setGameStatus("win");
      setGuessHistory((prevHistory: any) => {
        return {
          ...prevHistory,
          [lessonIndex]: currentGuessHistory.concat(guessTrimmed as any),
        };
      });
    } else if (guessHistory.length === 5) {
      alert("You lose");
      setGameStatus("lost");
    } else {
      // 1. add the current guess to guessHistory
      setGuessHistory((prevHistory: any) => {
        return {
          ...prevHistory,
          [lessonIndex]: currentGuessHistory.concat(guessTrimmed as any),
        };
      });

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

  const empties = Array(5 - currentGuessHistory.length).fill("     ");

  // console.log("guess history", guessHistory);

  // useEffect(() => {
  //   const currentLesson = course1?.lessons?.find(
  //     (lesson: any) => lesson?.id === lessonId
  //   );
  //   if (currentLesson) {
  //     setLessonIndex(0);
  //   }
  // }, [lessonId]);

  return (
    <div>
      <header className="flex w-80 mx-auto mt-10 mb-8">
        {/* <h1 className={"grow font-bold text-center text-sm text-gray-300"}>
          {" "}
          <span>拼音猜成语</span>{" "}
          <span className="text-gray-200">[worldle]</span>{" "}
        </h1> */}
      </header>

      <main className="pb-6 flex items-center justify-center flex-col">
        <h2 className="text-gray-400 font-extralight text-2xl">
          Write the following sentence in{" "}
          <span className="text-yellow-400">汉子</span>
        </h2>

        <div className="mt-16 text-center space-y-2">
          <p className="text-xl text-gray-500">{currentPhrase?.en}</p>
          <p className="text-4xl  text-gray-700 font-extralight">
            {currentPhrase?.pinyin}
          </p>
        </div>

        <div className="flex justify-center w-full my-16 flex-col items-center">
          <input
            disabled={gameStatus === "win"}
            className="text-center h-14 border-solid border-b-2 w-[320px] text-2xl px-2 focus:outline-none active:outline-none"
            value={currentGuess}
            onKeyDown={(event: any) => {
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
          {gameStatus === "win" && (
            <div className="text-center transition mt-8">
              <button
                onClick={() => {
                  return addAnswerMutation
                    .mutateAsync({
                      hanzi: secret,
                      answer: cleanString(currentGuess),
                      lessonId: lessonId,
                      phraseId: currentPhrase?.id,
                      status: "correct",
                    })
                    .then((res) => {
                      const lessonIdx = course1?.lessons?.findIndex(
                        (lesson: any) => lesson?.id === lessonIndex
                      );

                      if (lessonIdx !== -1) {
                        const nextId = course1?.lessons?.[lessonIdx + 1];

                        nextId?.id && setLessonIndex(nextId?.id);
                      } else {
                        setGameStatus("finish");
                      }

                      setCurrentGuess("");
                      setGameStatus("");
                    });
                }}
              >
                Continue
              </button>
            </div>
          )}
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
                const guessTrimmed = cleanString(currentGuess);
                const historyTrimmed = [
                  ...currentGuessHistory,
                  guessTrimmed,
                ]?.reduce((acc, curr) => `${acc}${curr}`, "");

                return addAnswerMutation
                  .mutateAsync({
                    hanzi: secret,
                    answer: historyTrimmed,
                    lessonId: lessonId,
                    phraseId: currentPhrase?.id,
                    status: "incorrect",
                  })
                  .then((res) => {
                    const lessonIdx = course1?.lessons?.findIndex(
                      (lesson: any) => lesson?.id === lessonIndex
                    );

                    if (lessonIdx !== -1) {
                      const nextId = course1?.lessons?.[lessonIdx + 1];

                      nextId?.id && setLessonIndex(nextId?.id);
                    } else {
                      setGameStatus("finish");
                    }
                    // setLessonIndex((prevIndex) => prevIndex + 1);
                    setCurrentGuess("");
                    setGameStatus("");
                  });
              }}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {gameStatus === "finish" && (
        <>
          {/* <div className="text-center text-2xl">
            <GameRow guess={secret} />
          </div> */}

          <div className="text-center transition">
            <button
              onClick={() => {
                const guessTrimmed = cleanString(currentGuess);
                const historyTrimmed = [
                  ...currentGuessHistory,
                  guessTrimmed,
                ]?.reduce((acc, curr) => `${acc}${curr}`, "");

                return addAnswerMutation
                  .mutateAsync({
                    hanzi: secret,
                    answer: historyTrimmed,
                    lessonId: lessonId,
                    phraseId: currentPhrase?.id,
                    status: "incorrect",
                  })
                  .then((res) => {
                    const lessonIdx = course1?.lessons?.findIndex(
                      (lesson: any) => lesson?.id === lessonIndex
                    );

                    if (lessonIdx !== -1) {
                      const nextId = course1?.lessons?.[lessonIdx + 1];

                      nextId?.id && setLessonIndex(nextId?.id);
                    } else {
                      setGameStatus("finish");
                    }
                    // setLessonIndex((prevIndex) => prevIndex + 1);
                    setCurrentGuess("");
                    setGameStatus("");
                  });
              }}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
