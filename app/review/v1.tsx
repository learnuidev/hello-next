"use client";

import React from "react";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import Link from "next/link";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { Icons } from "@/components/ui/icons.v2";

export function ReviewV1(props: any) {
  const [reveal, setReveal] = useState(false);

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data: components } = useListComponents();

  const {
    data: learnedCharacters,
    isLoading,
    isRefetching,
  } = useListCharacterReviewList();

  const currentCharacter = learnedCharacters?.[0];

  const currentComponent = components?.find(
    (component: any) => component?.hanzi === currentCharacter?.hanzi
  );

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
          <h2 className="text-8xl md:text-9xl">
            {currentCharacter?.hanzi || currentCharacter?.input}
          </h2>

          {reveal ? (
            <div className="mt-8">
              <h3> {currentCharacter?.en || currentComponent?.en}</h3>
            </div>
          ) : null}
        </div>
      )}

      <div className="space-x-24 my-8 text-5xl">
        {reveal ? (
          <>
            <button
              disabled={updateCharacterStatusMutation?.isLoading}
              className="hover:text-green-400"
              onClick={() => {
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
                    }),
                  } as any)
                  .then((res) => {
                    setReveal(false);
                  });

                // setResp();
              }}
            >
              <Icons.check />
            </button>
            <button
              disabled={updateCharacterStatusMutation?.isLoading}
              onClick={() => {
                updateCharacterStatusMutation
                  .mutateAsync({
                    characterId: currentCharacter?.id,
                    status: "needs_review",
                    wrongCount: (currentCharacter?.wrongCount || 0) + 1,
                    wrongAt: Date.now(),
                    reviewHistory: (
                      currentCharacter?.reviewHistory || []
                    ).concat({
                      outcome: "incorrect",
                      createdAt: Date.now(),
                    }),
                  } as any)
                  .then((res) => {
                    setReveal(false);
                  });

                // setResp();
              }}
            >
              <Icons.xMark />
            </button>

            <button
              disabled={updateCharacterStatusMutation?.isLoading}
              onClick={() => {
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
                    }),
                  } as any)
                  .then((res) => {
                    setReveal(false);
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
              }}
            >
              <Icons.lightBulb />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
