"use client";

import React from "react";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import Link from "next/link";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { Icons } from "@/components/ui/icons.v2";

const getEndTimeAndDiff = (startTime: number, endTime: number) => {
  const diff = endTime - startTime;

  console.log("Diff Time", diff);
  console.log("Start Time", startTime);

  return {
    endTime,
    timeTaken: diff,
  };
};

export function ReviewV1(props: any) {
  const [reveal, setReveal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data: components } = useListComponents();

  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

  const unReviewedCharacters = learnedCharacters?.filter(
    (character: any) => character?.hanzi?.length === 1
  );
  const currentCharacter = unReviewedCharacters?.[0];
  // const startTime = Date.now();

  console.log("START TIME", startTime);
  console.log("END TIME", endTime);
  const diff = endTime - startTime;
  console.log("DIFF TIME", diff);

  const currentComponent = components?.find(
    (component: any) => component?.hanzi === currentCharacter?.hanzi
  );

  const lang = currentCharacter?.lang || currentComponent?.lang;

  if (isLoading) {
    return;
  }

  if (!currentCharacter) {
    return (
      <div className="grow text-center">
        <NavBar />
        <div className="my-32">
          <h1 className="text-2xl">All Done</h1>

          <p className="my-4">You have finished all your reviews</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grow text-center">
      <div className="flex items-center justify-between mt-16 mb-16 px-4 md:px-16">
        <Link href={"/nmm"}>
          <Icons.xMark className="text-xl" />
        </Link>

        <h1 className="text-2xl">Do you know this character?</h1>

        <div></div>
      </div>

      {isRefetching ? (
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
          <Link
            href={`/nmm/${currentCharacter?.hanzi || currentCharacter?.input}${!lang ? "" : `?lang=${currentCharacter?.lang || currentComponent?.lang}`}`}
            className="text-8xl md:text-9xl"
            target="_blank"
          >
            {currentCharacter?.hanzi || currentCharacter?.input}
          </Link>

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
                          nextReviewTime: option?.value,
                          timeTaken,
                        }),
                      } as any)
                      .then((res) => {
                        const startTime = Date.now();
                        setReveal(false);
                        setShowOptions(false);
                        setStartTime(startTime);
                        setEndTime(startTime);
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
                const { timeTaken } = getEndTimeAndDiff(startTime, endTime);
                updateCharacterStatusMutation
                  .mutateAsync({
                    characterId: currentCharacter?.id,
                    status: "learned",
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                    rightAt: Date.now(),
                    reviewHistory: (
                      currentCharacter?.reviewHistory || []
                    ).concat({
                      outcome: "correct",
                      createdAt: Date.now(),
                      startTime: startTime,
                      endTime: endTime,
                      timeTaken,
                    }),
                  } as any)
                  .then((res) => {
                    const startTime = Date.now();
                    setReveal(false);
                    setStartTime(startTime);
                    setEndTime(startTime);
                  });

                // setResp();
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
                      timeTaken,
                    }),
                  } as any)
                  .then((res) => {
                    const startTime = Date.now();
                    setReveal(false);
                    setStartTime(startTime);
                    setEndTime(startTime);
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
              <Icons.lightBulb />
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
