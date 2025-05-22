"use client";

// @ts-ignore

import { useEffect, useState } from "react";

import { useAddAnswerMutation } from "@/domain/lesson/answer.mutations";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useGetContentQuery } from "@/domain/content/content.queries";

export const useWordleState = ({
  contentId: lessonId,
}: {
  contentId: string;
}) => {
  const searchParams = useSearchParams();

  const lessonIndexParams = searchParams.get("step") || null;
  const params = useParams() as {
    lessonId: string;
    "phrase-id": string;
    "content-id": string;
  };

  const { data: answers } = useListAnswersQuery(
    { journeyId: lessonId },
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: _currentLesson } = useGetContentQuery({ contentId: lessonId });

  const currentLesson: any = _currentLesson;

  const contents = currentLesson?.transcriptions;

  const phraseId = params?.["phrase-id"]
    ? decodeURIComponent(params?.["phrase-id"])
    : null;

  const router = useRouter();
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [_lessonId, setLessonId] = useState(
    lessonId || params?.["lessonId"] || "lesson11"
  );

  const [lessonIndex, setTranscriptionId] = useState<any>(0);

  const addAnswerMutation = useAddAnswerMutation();

  const currentPhrase = currentLesson?.transcriptions?.[lessonIndex];

  useEffect(() => {
    if (lessonIndexParams !== null) {
      const currentLesson = contents?.find(
        (lesson: any) => lesson?.id === _lessonId
      );

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

  const winHandler = () => {
    const guessTrimmed = currentGuess;
    const historyTrimmed = [...currentGuessHistory, guessTrimmed]?.reduce(
      (acc, curr) => `${acc}${curr}`,
      ""
    );

    const goToNextChallenge = () => {
      const currentPhraseIndex = currentLesson?.transcriptions?.findIndex(
        (lesson: any) => (lesson?.id || lesson?.hanzi) === lessonIndex
      );

      if (currentPhraseIndex !== -1) {
        const nextId =
          // @ts-ignore
          currentLesson?.transcriptions?.[currentPhraseIndex + 1];

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
  };

  const previousLessonHandler = () => {
    setTranscriptionId(Math.max(0, lessonIndex - 1));

    setCurrentGuess("");
    setGameStatus("");
  };

  const finishHandler = () => {
    const guessTrimmed = currentGuess;
    const historyTrimmed = [...currentGuessHistory, guessTrimmed]?.reduce(
      (acc, curr) => `${acc}${curr}`,
      ""
    );

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
  };

  const retryHandler = () => {
    const guessTrimmed = currentGuess;
    const historyTrimmed = [...currentGuessHistory, guessTrimmed]?.reduce(
      (acc, curr) => `${acc}${curr}`,
      ""
    );

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
  };

  const nextLessonHandler = () => {
    setTranscriptionId(
      Math.min(lessonIndex + 1, currentLesson?.transcriptions?.length - 1)
    );

    setCurrentGuess("");
    setGameStatus("");
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
    addAnswerMutation,
    nextLessonHandler,
    currentGuessHistory,
    secret,
    retryHandler,
    finishHandler,
    answers,
    totalLessons,
  };
};
