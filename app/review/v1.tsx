"use client";

import React from "react";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import Link from "next/link";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { Icons } from "@/components/ui/icons.v2";

export function ReviewV1(props: any) {
  const [resp, setResp] = useState(null);
  const [reveal, setReveal] = useState(false);

  const [index, setIndex] = useState(0);

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data: components } = useListComponents();

  const { data: learnedCharacters, isLoading } = useListCharacterReviewList();

  const currentCharacter = learnedCharacters?.[index];

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
      {/* <NavBar /> */}
      <h1 className="text-2xl mt-16 mb-16">Do you know this character?</h1>

      <div className="my-32">
        <h2 className="text-8xl md:text-9xl">{currentCharacter?.hanzi}</h2>

        {reveal || resp ? (
          <div className="mt-8">
            <h3> {currentCharacter?.pinyin || currentComponent?.pinyin}</h3>
            <h3> {currentCharacter?.en || currentComponent?.en}</h3>
          </div>
        ) : null}
      </div>

      {resp ? (
        <div className="space-x-24 my-8 text-3xl">
          <button
            disabled={updateCharacterStatusMutation?.isLoading}
            onClick={() => {
              updateCharacterStatusMutation.mutateAsync(resp).then((res) => {
                setResp(null);
                setIndex(index + 1);
                setReveal(false);
              });
            }}
          >
            Continue
          </button>
          <Link href={"/nmm"}>Exit</Link>
        </div>
      ) : (
        <div className="space-x-24 my-8 text-5xl">
          {reveal ? (
            <>
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                className="hover:text-green-400"
                onClick={() => {
                  setResp({
                    characterId: currentCharacter?.id,
                    status: "learned",
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                    rightAt: Date.now(),
                  } as any);
                }}
              >
                <Icons.check />
              </button>
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                onClick={() => {
                  setResp({
                    characterId: currentCharacter?.id,
                    status: "needs_review",
                    wrongCount: (currentCharacter?.wrongCount || 0) + 1,
                    wrongAt: Date.now(),
                  } as any);
                }}
              >
                <Icons.xMark />
              </button>

              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                onClick={() => {
                  setResp({
                    characterId: currentCharacter?.id,
                    status: "forgotten",
                    forgottenAt: Date.now(),
                    rightAt: Date.now(),
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                  } as any);
                }}
              >
                <Icons.fire />
              </button>
            </>
          ) : (
            <>
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                onClick={() => {
                  setReveal(true);
                }}
              >
                <Icons.eye />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
