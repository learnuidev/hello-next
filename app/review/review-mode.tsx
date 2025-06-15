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
import { getReviewSearchParams } from "@/components/settings-dialog/use-get-review-url";
import { useGetCurrentReviewCharacter } from "./use-get-current-review-character";
import { useReviewModeView } from "./use-review-mode";
import { useClozeReviewTimer } from "./cloze-review-timer-store";

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

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { setReviewMode } = useReviewModeView();

  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

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
    (state: any) => state?.setReviewCount
  )(date);
  const resetReviewCount = reviewCounterStore(
    (state: any) => state?.resetReviewCount
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

  const diff = endTime - startTime + clozeTime;

  if (isLoading) {
    return <div className="">...</div>;
  }

  const ReviewHeader = () => {
    return (
      <div className="flex items-center justify-between mt-8 mb-16 px-4 md:px-16">
        <Link
          href={
            entryId
              ? `/diary/${entryId}?view=insights`
              : `/nmm${level ? `?level=${level}` : ""}`
          }
          // onClick={() => {
          //   setReviewMode(null);
          // }}
        >
          <Icons.xMark className="text-2xl" />
        </Link>

        {/* <h1 className="text-2xl"></h1> */}
        <p className="text-gray-700 text-xl md:text-3xl">
          <Icons.language /> {remainingItems}
        </p>

        <div className="flex space-x-4 items-center">
          <Link
            href={`/review?view=cal`}
            className="flex items-center flex-col hover:text-white text-gray-400"
          >
            <Icons.cal className="text-xl" />
          </Link>

          {isEntry || isContent ? null : (
            <button
              className="flex items-center flex-col hover:text-white text-gray-500"
              onClick={() => {
                resetReviewCount();
                router.push(`/review?view=hsk-level&mode=${hskMode}`);
              }}
            >
              <p className="text-xl font-light uppercase">
                {hskMode?.includes("hsk") ? hskMode : "HSK"}
              </p>
            </button>
          )}
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

        <div className="space-x-12 flex justify-center items-center">
          {hskMode?.includes("hsk") ? (
            <button
              className="flex items-center flex-col hover:text-white text-gray-400"
              onClick={() => {
                resetReviewCount();
                router.push(`/review?view=hsk-level&mode=${hskMode}`);
              }}
            >
              <h4 className="text-xl text-gray-500">HSK</h4>

              <span className="text-[14px] font-light uppercase">
                Change level
              </span>
            </button>
          ) : (
            <button
              className="flex items-center flex-col hover:text-white text-gray-400"
              onClick={() => {
                resetReviewCount();
                router.push(`/review?view=cal`);
              }}
            >
              <Icons.cal className="text-xl" />

              <span className="text-[14px] font-light mt-2 uppercase">
                Change date
              </span>
            </button>
          )}

          {(reviewMode === "all" && hasNoChars) || isContent || isEntry ? (
            <button
              className="flex items-center flex-col hover:text-white text-gray-400 "
              onClick={() => {
                resetReviewCount();

                if (isEntry) {
                  router.push(`/diary/${entryId}?view=insights`);
                } else {
                  router.push(`/nmm?mode=${hskMode}`);
                }
              }}
            >
              <Icons.mandarin className="text-xl" />

              <span className="text-[14px] font-light mt-2 uppercase">
                Back to Home
              </span>
            </button>
          ) : (
            <button
              className="flex items-center flex-col hover:text-white text-gray-400 "
              onClick={() => {
                resetReviewCount();
                if (hskMode?.includes("hsk") || isContent || isEntry) {
                  const reviewSearchParams = getReviewSearchParams({
                    entryId,
                    mode: hskMode,
                    level,
                    reviewMode: "all",
                  });
                  router.push(`/review?${reviewSearchParams}`);
                }
              }}
            >
              <Icons.repeat className="text-xl" />

              <span className="text-[14px] font-light mt-2 uppercase">
                Restart
              </span>
            </button>
          )}
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

  return (
    <div className="grow text-center">
      <ReviewHeader />

      {updateCharacterStatusMutation?.isLoading ||
      !characterHanziOrInput ? null : (
        <div>
          {isParagraph ? (
            <h1 className="text-2xl">Do you know this paragraph?</h1>
          ) : (
            <h1 className="text-2xl">Do you know this character?</h1>
          )}
        </div>
      )}

      {updateCharacterStatusMutation?.isLoading ||
      isRefetching ||
      !characterHanziOrInput ? (
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
            <Link
              href={characterLink}
              className={cn("text-8xl md:text-9xl")}
              target="_blank"
            >
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
              <h3> {currentCharacter?.en || currentComponent?.en}</h3>
            </div>
          ) : null}
        </div>
      )}

      {overConfidentWarning && (
        <p className=" text-gray-500">{overConfidentWarning} </p>
      )}

      {updateCharacterStatusMutation?.isLoading ? null : (
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
                    disabled={updateCharacterStatusMutation?.isLoading}
                    className="hover:text-rose-400 font-extralight"
                    onClick={() => {
                      const { timeTaken } = getEndTimeAndDiff(
                        startTime,
                        endTime
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
                // { title: "1d", value: "1d" },
                { title: "3d", value: "3d" },
                { title: "7d", value: "7d" },
                { title: "1m", value: "30d" },
                { title: "3m", value: "90d" },
              ].map((option) => {
                return (
                  <button
                    key={JSON.stringify(option)}
                    disabled={updateCharacterStatusMutation?.isLoading}
                    className="hover:text-rose-400 font-extralight"
                    onClick={() => {
                      const { timeTaken } = getEndTimeAndDiff(
                        startTime,
                        endTime
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
                disabled={updateCharacterStatusMutation?.isLoading}
                className="hover:text-green-400"
                onClick={() => {
                  setShowCorrectOptions(true);
                }}
              >
                <Icons.check />
              </button>
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
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

              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                onClick={() => {
                  if (currentCharacter?.reviewHistory === undefined) {
                    setOverConfidenceWarning(
                      "You have not reviewed this character at all, are you sure you want to forget it"
                    );
                    return null;
                  } else if (currentCharacter?.reviewHistory?.length < 8) {
                    setOverConfidenceWarning(
                      "You have not reviewed this less than 8 times. This might indicate you have recency bias.. are you sure you want to forget it"
                    );
                    return null;
                  } else {
                    handleMastery();
                  }
                }}
              >
                <Icons.fire />
              </button>
            </>
          ) : isRefetching ? null : (
            <>
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
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
      {updateCharacterStatusMutation?.isLoading ? null : (
        <div className="space-x-12 mt-12 text-3xl">
          {
            // showOptions ? (
            //   <>
            //     {[
            //       {
            //         title: "Cry",
            //         value: "cry",
            //         Icon: Icons.cry,
            //         IconActive: Icons.crySolid,
            //       },
            //       {
            //         title: "Angry",
            //         value: "angry",
            //         Icon: Icons.angry,
            //         IconActive: Icons.angrySolid,
            //       },
            //       {
            //         title: "Spiral Eyes",
            //         value: "spiral-eyes",
            //         Icon: Icons.spiralEyes,
            //         IconActive: Icons.spiralEyesSolid,
            //       },
            //     ].map((option) => {
            //       return (
            //         <button
            //           key={JSON.stringify(option)}
            //           disabled={updateCharacterStatusMutation?.isLoading}
            //           className="hover:text-rose-400 font-extralight"
            //           onClick={() => {
            //             setEmotion(option.value);
            //           }}
            //         >
            //           {emotion === option?.value ? (
            //             <option.IconActive />
            //           ) : (
            //             <option.Icon />
            //           )}
            //         </button>
            //       );
            //     })}
            //   </>
            // )
            // :
            showCorrectOptions ? (
              <>
                {[
                  {
                    title: "Sweat",
                    value: "grin-sweat",
                    Icon: Icons.grinSweat,
                    IconActive: Icons.grinSweatSolid,
                  },
                  {
                    title: "Smile",
                    value: "smile",
                    Icon: Icons.smile,
                    IconActive: Icons.smileSolid,
                  },
                  // {
                  //   title: "Smirk",
                  //   value: "smirk",
                  //   Icon: Icons.smirk,
                  //   IconActive: Icons.smirkSolid,
                  // },
                  {
                    title: "Grin",
                    value: "grin",
                    Icon: Icons.grin,
                    IconActive: Icons.grinSolid,
                  },
                  {
                    title: "Party",
                    value: "Party",
                    Icon: Icons.party,
                    IconActive: Icons.partySolid,
                  },
                ].map((option) => {
                  return (
                    <button
                      key={JSON.stringify(option)}
                      disabled={updateCharacterStatusMutation?.isLoading}
                      className={cn("hover:text-rose-400 font-extralight")}
                      onClick={() => {
                        setEmotion(option.value);
                      }}
                    >
                      {emotion === option?.value ? (
                        <option.IconActive />
                      ) : (
                        <option.Icon />
                      )}
                    </button>
                  );
                })}
              </>
            ) : null
          }
        </div>
      )}

      {updateCharacterStatusMutation?.isLoading
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
