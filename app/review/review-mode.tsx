"use client";

import React from "react";
import { useState } from "react";

import { useListComponents } from "@/domain/lesson/component.queries";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import Link from "next/link";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { Icons } from "@/components/ui/icons.v2";
import { useRouter, useSearchParams } from "next/navigation";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { reviewCounterStore } from "./review-counter-store";
import { cn } from "@/lib/utils";
import { useUnreviwedCharacters } from "./use-unreviewed-characters";
import { useGetReviewParams } from "./use-get-review-params";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { useBeltStore } from "@/components/use-belt-store";

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
  const [showCorrectOptions, setShowCorrectOptions] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data: components } = useListComponents();

  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

  const router = useRouter();

  const {
    date,
    lang: langParams,
    character: nextCharacter,
  } = useGetReviewParams();

  const mode = useLearningModeStore((state) => state.mode);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

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

      return true;
    });

  const hasReviewedAll = date ? groupItems?.length <= reviewCount : false;

  const {
    data: unReviewedCharacters,
    isLoading: isUnreviewedCharactersLoading,
  } = useUnreviwedCharacters();

  // useEffect(() => {
  //   if (!nextCharacter) {
  //     if (unReviewedCharacters?.[1]?.hanzi) {
  //       router.push(`/review?character=${unReviewedCharacters?.[1]?.hanzi}`);
  //     }
  //   }
  // }, [nextCharacter, router, unReviewedCharacters]);

  const currentCharacter =
    unReviewedCharacters?.find((char: any) => char?.hanzi === nextCharacter) ||
    unReviewedCharacters?.[0];
  // const startTime = Date.now();

  // useEffect(() => {
  //   if (currentCharacter?.hanzi) {
  //     router.push(`/review?char=${currentCharacter?.hanzi}`);
  //   }
  // }, [currentCharacter]);

  const diff = endTime - startTime;

  const currentComponent = components?.find(
    (component: any) => component?.hanzi === currentCharacter?.hanzi
  );

  const lang = currentCharacter?.lang || currentComponent?.lang;

  const { studyMode, character } = useGetReviewParams();

  // if (isLoading) {
  //   return;
  // }

  const getUrl = () => {
    if (["hsk3", "hsk"]?.includes(mode)) {
      return `/review?mode=${mode}&level=${selectedBelt.hskLevel}&study-mode=${studyMode}`;
    }

    return "/review";
  };

  if (isLoading || isLearnedCharactersLoading) {
    return <div className="">...</div>;
  }

  if ((!currentCharacter || hasReviewedAll) && !isUnreviewedCharactersLoading) {
    return (
      <div className="grow text-center">
        {/* <NavBar /> */}
        <div className="flex items-center justify-between mt-16 mb-16 px-4 md:px-16">
          <Link href={"/nmm"}>
            <Icons.xMark className="text-xl" />
          </Link>

          <h1 className="text-2xl"></h1>

          <Link href={`/review?view=cal`}>
            <Icons.cal className="text-xl" />
          </Link>
        </div>
        <div className="my-32">
          <h1 className="text-2xl">All Done</h1>

          <p className="my-4">You have finished all your reviews</p>
        </div>

        <div>
          <button
            onClick={() => {
              resetReviewCount();
            }}
          >
            <Icons.reset className="text-xl" />
          </button>
        </div>
      </div>
    );
  }

  const goToNextChar = () => {
    const currentCharacterIndex = unReviewedCharacters?.findIndex(
      (char: any) => char?.hanzi === character
    );

    console.log("CURRENT CHAR INDEX", currentCharacterIndex);

    const nextChar = unReviewedCharacters?.[0];

    if (nextChar?.hanzi) {
      const url = getUrl();

      if (url?.includes("&")) {
        return router.push(`${url}&character=${nextChar?.hanzi}`);
      } else {
        router.push(`/review?character=${nextChar?.hanzi}`);
      }
    }
  };

  const isContentLessThanFive =
    (currentCharacter?.hanzi || currentCharacter?.input)?.length < 5;
  const isParagraph =
    (currentCharacter?.hanzi || currentCharacter?.input)?.length > 20;

  const characterLink = `/nmm/${currentCharacter?.hanzi || currentCharacter?.input}${!lang ? "?lang=zh&id=true" : `?lang=${currentCharacter?.lang || currentComponent?.lang}`}`;

  return (
    <div className="grow text-center">
      <div className="flex items-center justify-between mt-8 mb-16 px-4 md:px-16">
        <Link href={"/nmm"}>
          <Icons.xMark className="text-xl" />
        </Link>

        <p className="text-gray-700 text-xl">
          <Icons.language /> {unReviewedCharacters?.length}
        </p>

        <Link href={`/review?view=cal`}>
          <Icons.cal className="text-xl" />
        </Link>
      </div>

      <div>
        {isParagraph ? (
          <h1 className="text-2xl">Do you know this paragraph?</h1>
        ) : (
          <h1 className="text-2xl">Do you know this character?</h1>
        )}
      </div>

      {isRefetching ? (
        <div className="my-32">
          <h2 className="text-8xl md:text-9xl">
            <Icons.loadingSpinner />{" "}
          </h2>
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
              <Link
                href={characterLink}
                className={cn("text-md")}
                target="_blank"
              >
                {currentCharacter?.hanzi || currentCharacter?.input}
              </Link>
            </div>
          )}

          {reveal ? (
            <div className="mt-8">
              <h3> {currentCharacter?.en || currentComponent?.en}</h3>
            </div>
          ) : null}
        </div>
      )}

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
                    const { timeTaken } = getEndTimeAndDiff(startTime, endTime);

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
                        }),
                      } as any)
                      .then((res) => {
                        const startTime = Date.now();
                        setReveal(false);
                        setShowOptions(false);
                        setStartTime(startTime);
                        setEndTime(startTime);
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
            ].map((option) => {
              return (
                <button
                  key={JSON.stringify(option)}
                  disabled={updateCharacterStatusMutation?.isLoading}
                  className="hover:text-rose-400 font-extralight"
                  onClick={() => {
                    const { timeTaken } = getEndTimeAndDiff(startTime, endTime);

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
                        }),
                      } as any)
                      .then((res) => {
                        const startTime = Date.now();
                        setReveal(false);
                        setShowCorrectOptions(false);
                        setStartTime(startTime);
                        setEndTime(startTime);
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
                setShowOptions(true);
              }}
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
                    }),
                  } as any)
                  .then((res) => {
                    const startTime = Date.now();
                    setReveal(false);
                    setStartTime(startTime);
                    setEndTime(startTime);
                    setReviewCount(reviewCount + 1);

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

      {diff !== 0 && (
        <div className="mt-16 text-[rgb(31,32,33)] font-extralight flex space-x-6 items-center justify-center">
          <Icons.clock className="text-3xl" />
          <p className="text-4xl text-center">{diff}ms</p>
        </div>
      )}
    </div>
  );
}
