"use client";

import { useState } from "react";

import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { Icons } from "@/components/ui/icons.v2";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { reviewCounterStore } from "./review-counter-store";
import { useGetReviewParams } from "./use-get-review-params";
import { useUnreviwedCharacters } from "./use-unreviewed-characters";

import { SpeakComponent } from "@/components/_select-character/speak-component";
import { useGetCharacterAnalytics } from "@/components/_select-character/use-get-character-analytics";
import { getReviewSearchParams } from "@/components/settings-dialog/use-get-review-url";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useSpeak } from "../(auth)/convos/_play/use-speak";
import { useIsContent } from "./use-is-content";

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

export function ReviewMode(props: any) {
  const [reveal, setReveal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [showCorrectOptions, setShowCorrectOptions] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data: components } = useListComponents();

  const { data: allCharacters } = useListCharactersQuery();

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
    reviewMode,
    mode: hskMode,
    lang: langParams,
    character: nextCharacter,
    reviewSpeed,
  } = useGetReviewParams();

  const mode = useLearningModeStore((state) => state.mode);

  const reviewCounts = reviewCounterStore((state: any) => state?.reviewCounts);
  const setReviewCount = reviewCounterStore(
    (state: any) => state?.setReviewCount
  )(date);
  const resetReviewCount = reviewCounterStore(
    (state: any) => state?.resetReviewCount
  )(date);

  const reviewCount = reviewCounts?.[date] || 0;

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const group = groups?.find((group) => group?.title === date);

  const groupItems = group?.items
    // ?.filter((character: any) => character?.hanzi?.length === 1)
    ?.sort((a: any, b: any) => {
      return (a?.reviewHistory?.length || 0) - (b?.reviewHistory?.length || 0);
    })
    ?.filter((item: any) => {
      if (langParams) {
        return item?.lang === langParams;
      }

      return item?.hanzi?.length <= 3;

      return true;
    });

  const {
    understandingRate,
    precisionRate,
    totalCharacters,
    uniqueComponentWords,
    totalNewCharaters,
    uniqueWords,
    masteryRate,
  } = useGetCharacterAnalytics({
    characterId: input,
    lang: "zh",
  });

  const { speak } = useSpeak();

  const hasReviewedAll = input
    ? uniqueComponentWords?.length <= reviewCount
    : date
      ? groupItems?.length <= reviewCount
      : false;

  const {
    data: unReviewedCharacters,
    isLoading: isUnreviewedCharactersLoading,
  } = useUnreviwedCharacters();

  // console.log("UN REVIEWED CHARS", unReviewedCharacters);

  const isContent = useIsContent(hskMode);

  const currentCharacter = isContent
    ? reviewMode === "all"
      ? unReviewedCharacters?.[reviewCount]
      : unReviewedCharacters?.[0]
    : reviewMode === "all"
      ? unReviewedCharacters?.[reviewCount]
      : unReviewedCharacters?.find(
          (char: any) => char?.hanzi === nextCharacter
        ) ||
        // allCharacters?.find((char: any) => char?.hanzi === nextCharacter) ||
        unReviewedCharacters?.[0];

  const diff = endTime - startTime;

  const currentComponent = components?.find(
    (component: any) => component?.hanzi === currentCharacter?.hanzi
  );

  const lang = currentCharacter?.lang || currentComponent?.lang;

  const { studyMode, character } = useGetReviewParams();

  const getUrl = () => {
    const reviewSearchParamsUrl = getReviewSearchParams({
      mode,
      level,
      studyMode,
      date,
      input,
      reviewSpeed,
      reviewMode,
    });
    // if (["hsk3", "hsk"]?.includes(mode)) {
    //   return `/review?mode=${mode}&level=${level}&study-mode=${studyMode}&date=${date}`;
    // }
    return `/review?${reviewSearchParamsUrl}`;

    // return `/review?date=${date}`;
  };

  if (isLoading || isLearnedCharactersLoading) {
    return <div className="">...</div>;
  }

  const remainingItems = input
    ? uniqueComponentWords?.length - reviewCount
    : date
      ? groupItems?.length - reviewCount
      : reviewMode === "all"
        ? unReviewedCharacters?.length - reviewCount
        : unReviewedCharacters?.length;

  const hasNoChars =
    (!currentCharacter || hasReviewedAll) && !isUnreviewedCharactersLoading;

  const ReviewHeader = () => {
    return (
      <div className="flex items-center justify-between mt-8 mb-16 px-4 md:px-16">
        <Link href={`/nmm${level ? `?level=${level}` : ""}`}>
          <Icons.xMark className="text-xl" />
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
        </div>

        {/* {hskMode?.includes("hsk") ? (
          <button
            className="flex items-center flex-col hover:text-white text-gray-400"
            onClick={() => {
              resetReviewCount();
              router.push(`/review?view=hsk-level&mode=${hskMode}`);
            }}
          >
            <p className="text-xl text-gray-500">HSK</p>

            <span className="text-[10px] font-light uppercase">
              Change level
            </span>
          </button>
        ) : (
          <Link href={`/review?view=cal`}>
            <Icons.cal className="text-xl" />
          </Link>
        )} */}
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
          {hskMode?.includes("hsk") || isContent ? (
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

          {(reviewMode === "all" && hasNoChars) || isContent ? (
            <button
              className="flex items-center flex-col hover:text-white text-gray-400 "
              onClick={() => {
                resetReviewCount();
                router.push(`/nmm?mode=${hskMode}`);
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
                if (hskMode?.includes("hsk") || isContent) {
                  router.push(
                    `/review?mode=${hskMode}&level=${level}&review-mode=all`
                  );
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

  const goToNextChar = () => {
    const currentCharacterIndex = unReviewedCharacters?.findIndex(
      (char: any) => char?.hanzi === character
    );

    const nextChar = unReviewedCharacters?.[currentCharacterIndex + 1];

    if (nextChar?.hanzi) {
      const url = getUrl();

      if (url?.includes("&")) {
        return router.push(`${url}`);
      } else if (url?.includes("date") || url?.includes("input")) {
        router.push(url);
      } else {
        router.push("/review");
      }
    }
  };

  const isContentLessThanFive =
    (currentCharacter?.hanzi || currentCharacter?.input)?.length < 5;
  const isParagraph =
    (currentCharacter?.hanzi || currentCharacter?.input)?.length > 20;

  const characterLink = `/nmm/${currentCharacter?.hanzi || currentCharacter?.input}${!lang ? "?lang=zh&id=true" : `?lang=${currentCharacter?.lang || currentComponent?.lang}`}`;

  const characterHanziOrInput =
    currentCharacter?.hanzi || currentCharacter?.input;

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

      {updateCharacterStatusMutation?.isLoading ? null : (
        <div className="space-x-12 sm:space-x-16 md:space-x-24 my-8 md:text-5xl sm:text-3xl text-2xl">
          {showOptions ? (
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
                            mode,
                            emotion,
                          }),
                        } as any)
                        .then((res) => {
                          const startTime = Date.now();
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
                            mode,
                            emotion,
                          }),
                        } as any)
                        .then((res) => {
                          const startTime = Date.now();
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

                    console.log("PONDER TIME", ponderTime);

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
                          mode,
                          emotion,
                        }),
                      } as any)
                      .then((res) => {
                        const startTime = Date.now();
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
                  const { timeTaken } = getEndTimeAndDiff(startTime, endTime);

                  const ponderTime = getPonderTime(endTime);

                  updateCharacterStatusMutation
                    .mutateAsync({
                      characterId: currentCharacter?.id,
                      status: "forgotten",
                      forgottenAt: Date.now(),
                      rightAt: Date.now(),
                      rightCount: (currentCharacter?.rightCount || 0) + 1,
                      reviewHistory: (
                        currentCharacter?.reviewHistory || []
                      ).concat({
                        outcome: "correct",
                        createdAt: Date.now(),
                        startTime: startTime,
                        endTime: endTime,
                        reviewDate: date,
                        timeTaken,
                        ponderTime,
                        mode,
                        emotion,
                      }),
                    } as any)
                    .then((res) => {
                      const startTime = Date.now();
                      setReveal(false);
                      setStartTime(startTime);
                      setEndTime(startTime);
                      setReviewCount(reviewCount + 1);
                      setEmotion("");
                      goToNextChar();
                    });
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
        : diff !== 0 && (
            <div className="mt-16 text-[rgb(31,32,33)] font-extralight flex space-x-6 items-center justify-center">
              <Icons.clock className="text-3xl" />
              <p className="text-4xl text-center">{diff}ms</p>
            </div>
          )}
    </div>
  );
}
