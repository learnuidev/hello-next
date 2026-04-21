"use client";

import { useState } from "react";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { Icons } from "@/components/ui/icons.v2";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { reviewCounterStore } from "./review-counter-store";
import { useGetReviewParams } from "./use-get-review-params";

import { SpeakComponent } from "@/components/_select-character/speak-component";
import { usePreviousPathnameStore } from "@/components/language-selector/use-previous-path-name-store";
import { useGetReviewUrl } from "@/components/settings-dialog/use-get-review-url";
import {
  listCharactersQueryId,
  listCharactersQueryMapId,
  useListCharactersMapQuery,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";
import { useQueryClient } from "@tanstack/react-query";
import { BackButton } from "./back-button";
import { useClozeReviewTimer } from "./cloze-review-timer-store";
import { useGetCurrentReviewCharacter } from "./use-get-current-review-character";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";

const getEndTimeAndDiff = (startTime: number, endTime: number) => {
  const diff = endTime - startTime;

  return {
    endTime,
    timeTaken: diff,
  };
};

const getPonderTime = (endTime: number) => {
  const ponderEndTime = Date.now();

  const { timeTaken: ponderTime } = getEndTimeAndDiff(endTime, ponderEndTime);

  return ponderTime;
};

export function ReviewModeClassic(props: any) {
  const [reveal, setReveal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [showCorrectOptions, setShowCorrectOptions] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [overConfidentWarning, setOverConfidenceWarning] = useState<
    null | string
  >(null);

  const queryClient = useQueryClient();

  const { reviewUrl, reviewContentId } = useGetReviewUrl();

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [listCharactersQueryId, reviewContentId],
      });
      queryClient.refetchQueries({
        queryKey: [listCharactersQueryMapId],
      });
    },
  });

  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList(reviewContentId);

  const router = useRouter();

  const {
    date,
    level,
    input,
    entryId,
    reviewMode,
    mode: hskMode,
    lang: langParams,
    character: nextCharacter,
    reviewSpeed,
  } = useGetReviewParams();

  const { mode } = useLearningMode();

  const reviewCounts = reviewCounterStore((state: any) => state?.reviewCounts);
  const setReviewCount = reviewCounterStore(
    (state: any) => state?.setReviewCount,
  )(date);
  const resetReviewCount = reviewCounterStore(
    (state: any) => state?.resetReviewCount,
  )(date);

  const reviewCount = reviewCounts?.[date] || 0;

  const {
    currentCharacter,
    hasReviewedAll,
    currentComponent,
    goToNextChar,
    remainingItems,
    isContent,
    isEntry,
    lang,
    hasNoChars,
  } = useGetCurrentReviewCharacter();

  const { isLoading: listCharactersLoading } = useListCharactersQuery();
  const { isLoading: listCharactersMapLoading } = useListCharactersMapQuery();

  const { setPreviousPath, previousPath } = usePreviousPathnameStore();

  const {
    startTime: _startTime,
    endTime: _endTime,
    resetTime,
  } = useClozeReviewTimer(currentCharacter?.hanzi || currentCharacter?.input);

  const _clozeTime = Math.abs(_endTime - _startTime);
  const clozeTime = isNaN(_clozeTime)
    ? 0
    : _clozeTime > 100000
      ? 0
      : Math.max(0, _clozeTime);

  const { data: meaningDiscovery, isLoading: isMeaningDiscoveryLoading } =
    useListDiscoveryQuery({
      content: currentCharacter?.hanzi || currentCharacter?.input,
      lang,
    });

  const finalEnVal =
    meaningDiscovery?.en || currentCharacter?.en || currentComponent?.en;

  const diff = endTime - startTime + clozeTime;

  if (isLoading || listCharactersLoading || listCharactersMapLoading) {
    return <div className="">...</div>;
  }

  const ReviewHeader = () => {
    return (
      <div className="flex items-center justify-between mt-8 mb-16 px-4 md:px-16">
        <BackButton
          href={input ? getNmmLink({ id: input, lang: "zh" }) : "/"}
        />

        {/* <h1 className="text-2xl"></h1> */}
        <p className="text-gray-700 text-xl md:text-3xl">
          <Icons.language /> {remainingItems}
        </p>

        <div className="flex space-x-4 items-center">
          <div></div>
        </div>
      </div>
    );
  };

  if (hasNoChars) {
    return (
      <div className="grow text-center">
        {/* <NavBar /> */}

        <ReviewHeader />

        <div className="my-32">
          <h1 className="text-2xl">All Done</h1>

          <p className="my-4 text-gray-400 px-12">
            You have finished all your reviews for this level
          </p>
        </div>
      </div>
    );
  }

  const isContentLessThanFive =
    (currentCharacter?.hanzi || currentCharacter?.input)?.length < 5;
  const isParagraph =
    (currentCharacter?.hanzi || currentCharacter?.input)?.length > 20;

  const characterLink = `/nmm/${currentCharacter?.hanzi || currentCharacter?.input}${!lang ? "?lang=zh&id=true" : `?lang=${currentCharacter?.lang || currentComponent?.lang}`}`;

  const characterHanziOrInput =
    currentCharacter?.hanzi || currentCharacter?.input;

  const handleMastery = () => {
    const { timeTaken } = getEndTimeAndDiff(startTime, endTime);

    const ponderTime = getPonderTime(endTime);

    updateCharacterStatusMutation
      .mutateAsync({
        characterId: currentCharacter?.id,
        status: "forgotten",
        forgottenAt: Date.now(),
        rightAt: Date.now(),
        rightCount: (currentCharacter?.rightCount || 0) + 1,
        reviewHistory: (currentCharacter?.reviewHistory || []).concat({
          outcome: "correct",
          createdAt: Date.now(),
          startTime: startTime,
          endTime: endTime,
          reviewDate: date,
          timeTaken,
          ponderTime,
          clozeTime,
          mode: hskMode || mode,
          emotion,
        }),
      } as any)
      .then((res) => {
        const startTime = Date.now();
        resetTime();
        setReveal(false);
        setStartTime(startTime);
        setEndTime(startTime);
        setReviewCount(reviewCount + 1);
        setEmotion("");
        goToNextChar();
        setOverConfidenceWarning(null);
      });
  };

  const isLoadingOrRefetching =
    updateCharacterStatusMutation.isPending ||
    isRefetching ||
    !characterHanziOrInput;

  return (
    <div className="grow text-center">
      <ReviewHeader />

      {updateCharacterStatusMutation.isPending ||
      !characterHanziOrInput ? null : (
        <div>
          {isParagraph ? (
            <h1 className="text-2xl">Do you know this paragraph?</h1>
          ) : (
            <h1 className="text-2xl">Do you know this character?</h1>
          )}
        </div>
      )}

      {isLoadingOrRefetching ? (
        <div className="my-32">
          <h2 className="text-8xl md:text-9xl">...</h2>
        </div>
      ) : (
        <div className="my-32">
          {reveal ? (
            <div className="mt-8">
              <h3 className="text-gray-400">
                {" "}
                {currentCharacter?.pinyin ||
                  currentComponent?.pinyin ||
                  currentCharacter?.roman ||
                  currentComponent?.roman}
              </h3>
            </div>
          ) : null}
          {isContentLessThanFive ? (
            <Link href={characterLink} className={cn("text-8xl md:text-9xl")}>
              {currentCharacter?.hanzi || currentCharacter?.input}
            </Link>
          ) : (
            <div className="lg:px-80 md:px-32 px-8">
              <div className="flex justify-center items-center space-x-4">
                <Link
                  href={characterLink}
                  className={cn("text-md")}
                  target="_blank"
                >
                  {currentCharacter?.hanzi || currentCharacter?.input}
                </Link>

                <SpeakComponent currentPhrase={currentCharacter} />
              </div>
            </div>
          )}

          {reveal ? (
            <div className="mt-8">
              <h3>{finalEnVal}</h3>
            </div>
          ) : null}
        </div>
      )}

      {overConfidentWarning && !isRefetching && (
        <p className=" text-gray-500">{overConfidentWarning} </p>
      )}

      {updateCharacterStatusMutation.isPending ? null : (
        <div className="space-x-12 sm:space-x-16 md:space-x-24 my-8 md:text-5xl sm:text-3xl text-2xl">
          {overConfidentWarning ? (
            <>
              <button
                className="text-xl"
                onClick={() => {
                  handleMastery();
                }}
              >
                Yes I am sure
              </button>

              <button
                className="text-xl"
                onClick={() => {
                  setOverConfidenceWarning(null);
                }}
              >
                No, I am not sure
              </button>
            </>
          ) : showOptions ? (
            <>
              {[
                { title: "1m", value: "1m" },
                { title: "5m", value: "5m" },
                { title: "10m", value: "10m" },
                { title: "1d", value: "1d" },
              ].map((option) => {
                return (
                  <button
                    key={JSON.stringify(option)}
                    disabled={updateCharacterStatusMutation.isPending}
                    className="hover:text-rose-400 font-extralight"
                    onClick={() => {
                      const { timeTaken } = getEndTimeAndDiff(
                        startTime,
                        endTime,
                      );

                      const ponderTime = getPonderTime(endTime);

                      updateCharacterStatusMutation
                        .mutateAsync({
                          characterId: currentCharacter?.id,
                          status: "needs_review",
                          wrongCount: (currentCharacter?.wrongCount || 0) + 1,
                          wrongAt: Date.now(),
                          nextReviewTime: option?.value,
                          reviewHistory: (
                            currentCharacter?.reviewHistory || []
                          ).concat({
                            outcome: "incorrect",
                            createdAt: Date.now(),
                            startTime: startTime,
                            endTime: endTime,
                            reviewDate: date,
                            nextReviewTime: option?.value,
                            timeTaken,
                            ponderTime,
                            clozeTime,
                            isContent,
                            mode: hskMode || mode,
                            emotion,
                          }),
                        } as any)
                        .then((res) => {
                          const startTime = Date.now();
                          resetTime();
                          setReveal(false);
                          setShowOptions(false);
                          setStartTime(startTime);
                          setEndTime(startTime);
                          setEmotion("");
                          setReviewCount(reviewCount + 1);

                          goToNextChar();
                        });
                    }}
                  >
                    {option?.title}
                  </button>
                );
              })}
            </>
          ) : showCorrectOptions ? (
            <>
              {[
                { title: "1d", value: "1d" },
                { title: "3d", value: "3d" },
                { title: "7d", value: "7d" },
                { title: "1m", value: "30d" },
                { title: "3m", value: "90d" },
              ].map((option) => {
                return (
                  <button
                    key={JSON.stringify(option)}
                    disabled={updateCharacterStatusMutation.isPending}
                    className="hover:text-rose-400 font-extralight"
                    onClick={() => {
                      const { timeTaken } = getEndTimeAndDiff(
                        startTime,
                        endTime,
                      );

                      const ponderTime = getPonderTime(endTime);

                      updateCharacterStatusMutation
                        .mutateAsync({
                          characterId: currentCharacter?.id,
                          status: "learned",
                          rightCount: (currentCharacter?.rightCount || 0) + 1,
                          rightAt: Date.now(),
                          nextReviewTime: option?.value,
                          reviewHistory: (
                            currentCharacter?.reviewHistory || []
                          ).concat({
                            outcome: "correct",
                            createdAt: Date.now(),
                            startTime: startTime,
                            endTime: endTime,
                            reviewDate: date,
                            nextReviewTime: option?.value,
                            timeTaken,
                            ponderTime,
                            isContent,
                            clozeTime,
                            mode: hskMode || mode,
                            emotion,
                          }),
                        } as any)
                        .then((res) => {
                          const startTime = Date.now();
                          resetTime();
                          setReveal(false);
                          setShowCorrectOptions(false);
                          setStartTime(startTime);
                          setEndTime(startTime);
                          setEmotion("");
                          setReviewCount(reviewCount + 1);

                          goToNextChar();
                        });
                    }}
                  >
                    {option?.title}
                  </button>
                );
              })}
            </>
          ) : reveal ? (
            <>
              <button
                disabled={updateCharacterStatusMutation.isPending}
                className="hover:text-green-400"
                onClick={() => {
                  setShowCorrectOptions(true);
                }}
              >
                <Icons.check />
              </button>
              <button
                disabled={updateCharacterStatusMutation.isPending}
                onClick={() => {
                  if (reviewSpeed) {
                    const { timeTaken } = getEndTimeAndDiff(startTime, endTime);

                    const ponderTime = getPonderTime(endTime);

                    updateCharacterStatusMutation
                      .mutateAsync({
                        characterId: currentCharacter?.id,
                        status: "needs_review",
                        wrongCount: (currentCharacter?.wrongCount || 0) + 1,
                        wrongAt: Date.now(),
                        nextReviewTime: "1m",
                        reviewHistory: (
                          currentCharacter?.reviewHistory || []
                        ).concat({
                          outcome: "incorrect",
                          createdAt: Date.now(),
                          startTime: startTime,
                          endTime: endTime,
                          reviewDate: date,
                          nextReviewTime: "1m",
                          timeTaken,
                          isContent,
                          ponderTime,
                          clozeTime,
                          mode: hskMode || mode,
                          emotion,
                        }),
                      } as any)
                      .then((res) => {
                        const startTime = Date.now();
                        resetTime();
                        setReveal(false);
                        setShowOptions(false);
                        setStartTime(startTime);
                        setEndTime(startTime);
                        setEmotion("");
                        setReviewCount(reviewCount + 1);

                        goToNextChar();
                      });
                  } else {
                    setShowOptions(true);
                  }
                }}
                // onClick={() => {
                //   setShowOptions(true);
                // }}
              >
                <Icons.xMark />
              </button>

              {isRefetching ? null : (
                <button
                  disabled={updateCharacterStatusMutation.isPending}
                  onClick={() => {
                    if (currentCharacter?.reviewHistory === undefined) {
                      setOverConfidenceWarning(
                        "You have not reviewed this character at all, are you sure you want to forget it",
                      );
                      return null;
                    } else if (currentCharacter?.reviewHistory?.length < 8) {
                      setOverConfidenceWarning(
                        "You have reviewed this less than 8 times. This might indicate you have recency bias.. are you sure you want to forget it",
                      );
                      return null;
                    } else {
                      handleMastery();
                    }
                  }}
                >
                  <Icons.fire />
                </button>
              )}
            </>
          ) : isRefetching ? null : (
            <>
              <button
                disabled={updateCharacterStatusMutation.isPending}
                onClick={() => {
                  setReveal(true);
                  setEndTime(Date.now());
                }}
              >
                <Icons.lightBulb className="text-4xl md:text-5xl" />
              </button>
            </>
          )}
        </div>
      )}

      {updateCharacterStatusMutation.isPending
        ? null
        : reveal && (
            <div className="mt-16 text-[rgb(31,32,33)] font-extralight flex space-x-6 items-center justify-center">
              <Icons.clock className="text-3xl" />
              <p className="text-4xl text-center">{diff}ms</p>
            </div>
          )}
    </div>
  );
}
