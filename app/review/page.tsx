"use client";
import React from "react";
import { useState, useEffect } from "react";

import { NavBar } from "@/components/navbar";
import { useListTonePairsQuery } from "@/domain/tone-pairs/tone-pairs.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useSelectedCharacter } from "../(auth)/convos/use-selected-character";

import { SelectedCharacter } from "@/components/selected-character";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSpring } from "@react-spring/web";

import { belts, calculateColor } from "../nmm/utils";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/pro-thin-svg-icons";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import Link from "next/link";
import { isBefore } from "date-fns";

export default function NomadMethodPage(props: any) {
  // const [selectedBelt, setSelectedBelt] = useState<any>(belts?.[0]);

  const [resp, setResp] = useState(null);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);

  const selectedId = useSelectedCharacter((state: any) => state?.character);
  const setSelectedId = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );
  const [view, setView] = useState("characters");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const { data } = useListTonePairsQuery({});

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

  const lastAnswer = answers?.[answers?.length - 1];

  const useListCharacterReviewList = () => {
    const { data: learnedCharacters, ...rest } = useListCharactersQuery();

    const reviewCharacters = learnedCharacters?.filter((character: any) =>
      character?.status === "learned"
        ? false
        : character?.next_review_date
        ? isBefore(new Date(character?.next_review_date), new Date())
        : true
    );

    return {
      ...rest,
      data: reviewCharacters,
    };
  };

  // const { data: learnedCharacters } = useListCharactersQuery();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((seconds) => seconds + 1);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const { data: components } = useListComponentsQuery();


  const { data: learnedCharacters } = useListCharacterReviewList()

  const currentCharacter = learnedCharacters?.[index];

  const currentComponent = components?.find(
    (component: any) => component?.hanzi === currentCharacter?.hanzi
  );

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
      <NavBar />
      <h1 className="text-2xl mt-16 mb-16">Do you know this character?</h1>

      <div className="my-32">
        <h2 className="text-8xl md:text-9xl">{currentCharacter?.hanzi}</h2>

        {resp ? (
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
              });
            }}
          >
            Continue
          </button>
          <Link
            href={"/nmm"}
            // disabled={updateCharacterStatusMutation?.isLoading}
            // onClick={() => {
            //   updateCharacterStatusMutation.mutateAsync(resp).then((res) => {
            //     setResp(null);
            //     setIndex(index + 1);
            //   });
            // }}
          >
            Exit
          </Link>
        </div>
      ) : (
        <div className="space-x-24 my-8 text-5xl">
          <button
            disabled={updateCharacterStatusMutation?.isLoading}
            className="hover:text-green-400"
            onClick={() => {
              setResp({
                characterId: currentCharacter?.id,
                status: "learned",
              } as any);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            disabled={updateCharacterStatusMutation?.isLoading}
            onClick={() => {
              setResp({
                characterId: currentCharacter?.id,
                status: "needs_review",
              } as any);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}

      {/* {JSON.stringify(currentCharacter, null, 2)} */}
    </div>
  );
}
