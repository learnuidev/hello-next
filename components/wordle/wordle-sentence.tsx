"use client";

import { faBadgeCheck } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FinishButton, GameRow, WinButton } from "./wordle.core";

import { useState } from "react";

interface ICurrentPhrase {
  input?: string;
  hanzi?: string;
  pinyin?: string;
  en?: string;
  id?: string;
}

const useWordleState = ({
  currentPhrase,
}: {
  currentPhrase: ICurrentPhrase;
}) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [_lessonId, setLessonId] = useState(currentPhrase?.id);

  const [lessonIndex, setTranscriptionId] = useState<any>(0);

  const secret = currentPhrase?.hanzi || currentPhrase?.input;

  // 1. game state
  const [guessHistory, setGuessHistory] = useState<any>({
    0: [],
    1: [],
    2: [],
  });

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
      // 1. add the current guess to guessHistory
      setGuessHistory((prevHistory: any) => {
        return {
          ...prevHistory,
          [lessonIndex]: (currentGuessHistory || []).concat(
            guessTrimmed as any
          ),
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

  const currentLessonStep = lessonIndex + 1;

  const resetState = () => {
    setGameStatus("finish");

    setCurrentGuess("");
    setGameStatus("");
    setGuessHistory({});
  };

  const winHandler = () => {
    resetState();
  };

  const previousLessonHandler = () => {
    setTranscriptionId(Math.max(0, lessonIndex - 1));

    setCurrentGuess("");
    setGameStatus("");
  };

  const finishHandler = () => {
    resetState();
  };

  const retryHandler = () => {
    resetState();
  };

  const nextLessonHandler = () => {
    resetState();
  };

  const inputKeyDownHandler = (event: any) => {
    if (event.key === "ArrowUp") {
      const guessHistoryItem = guessHistory?.[lessonIndex as string];
      const lastGuess = guessHistoryItem?.[guessHistoryItem?.length - 1];

      setCurrentGuess(lastGuess);
      return null;
    }

    if (event.key === "Enter") {
      handleEnter();
    } else {
      setCurrentGuess(event.target.value);
    }
  };

  return {
    currentLessonStep,
    previousLessonHandler,
    currentPhrase,
    inputKeyDownHandler,
    gameStatus,
    currentGuess,
    handleKeyup,
    winHandler,

    nextLessonHandler,
    currentGuessHistory,
    secret,
    retryHandler,
    finishHandler,
  };
};

export function WordleSentence({
  currentPhrase,
}: {
  currentPhrase: ICurrentPhrase;
}) {
  const {
    currentLessonStep,
    previousLessonHandler,
    inputKeyDownHandler,
    gameStatus,
    currentGuess,
    handleKeyup,
    winHandler,

    nextLessonHandler,
    currentGuessHistory,
    secret,
    retryHandler,
    finishHandler,
  } = useWordleState({ currentPhrase });

  return (
    <div>
      <main className="py-12 flex items-center justify-center flex-col mt-32">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-32">
          <span className="text-black">
            <FontAwesomeIcon className="text-2xl" icon={faBadgeCheck} />
          </span>
          <h2 className="text-gray-400 font-extralight text-lg md:text-2xl">
            Write the following sentence in{" "}
            <span className="text-yellow-400">汉子</span>
          </h2>

          <div></div>
        </div>

        <div className="grid grid-cols-12 w-full px-4 md:px-32 justify-end items-center">
          <div></div>
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
            </div>

            <div className="flex justify-center w-full my-16 flex-col items-center">
              <input
                autoFocus
                disabled={gameStatus === "win"}
                className="text-center h-14 border-solid border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
                value={currentGuess}
                onKeyDown={inputKeyDownHandler}
                onChange={handleKeyup}
              />
              {gameStatus === "win" && (
                <WinButton onClick={winHandler}>{"Continue"}</WinButton>
              )}
            </div>
          </div>

          <div></div>
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
            <button onClick={retryHandler}>Retry</button>
          </div>
        </>
      )}

      {gameStatus === "finish" && <FinishButton onClick={finishHandler} />}
    </div>
  );
}
