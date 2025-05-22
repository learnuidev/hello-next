"use client";

// @ts-ignore

import { faBadgeCheck } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  FinishButton,
  GameRow,
  NextLessonButton,
  PreviousLessonButton,
  WinButton,
} from "./wordle.core";

import { useWordleState } from "./use-wordle-state";

export function Wordle({ contentId }: { contentId: string }) {
  const {
    currentLessonStep,
    previousLessonHandler,
    currentPhrase,
    inputKeyDownHandler,
    gameStatus,
    currentGuess,
    handleKeyup,
    winHandler,
    addAnswerMutation,
    nextLessonHandler,
    currentGuessHistory,
    secret,
    retryHandler,
    finishHandler,
    answers,
    totalLessons,
  } = useWordleState({ contentId });

  return (
    <div>
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

        <div className="grid grid-cols-12 w-full px-4 md:px-32 justify-end items-center">
          <PreviousLessonButton
            disabled={currentLessonStep === 1}
            onClick={previousLessonHandler}
          />
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
                <WinButton onClick={winHandler}>
                  {addAnswerMutation?.isLoading ? "Loading 。。。" : "Continue"}
                </WinButton>
              )}
            </div>
          </div>

          <NextLessonButton onClick={nextLessonHandler} />
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
