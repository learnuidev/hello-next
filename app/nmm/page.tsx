"use client";
import React from "react";
import { useState, useEffect } from "react";

import { NavBar } from "@/components/navbar";
import { useListTonePairsQuery } from "@/domain/tone-pairs/tone-pairs.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useSelectedCharacter } from "../(auth)/convos/use-selected-character";

import { SelectedCharacter } from "@/components/selected-character";

import { useSpring } from "@react-spring/web";

import { belts, calculateColor } from "./utils";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

export default function NomadMethodPage(props: any) {
  // const [selectedBelt, setSelectedBelt] = useState<any>(belts?.[0]);

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

  const lastAnswer = answers?.[answers?.length - 1];

  const { data: learnedCharacters2 } = useListCharactersQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { data: components } = useListComponentsQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const styles = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" },
  });

  return (
    <div className="grow">
      <NavBar />

      {selectedId ? null : (
        <div className="w-full text-center flex justify-center items-center space-x-4 mt-12 mb-8">
          {belts?.map?.((belt) => {
            return (
              <button
                key={belt?.fill}
                onClick={() => {
                  setSelectedBelt(belt as any);
                }}
                className={`${
                  belt?.level === (selectedBelt?.level as any)
                    ? belt?.fill
                    : belt?.unselected
                } h-4 w-4 rounded-full text`}
              ></button>
            );
          })}
        </div>
      )}

      {selectedId ? (
        <SelectedCharacter />
      ) : (
        <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
          {components?.length &&
            components
              ?.slice(0, selectedBelt?.maxCharacterLevel || 4000)
              .map((prop: any, idx: number) => {
                const selectedComp = components?.find(
                  (component: any) => component?.hanzi === prop?.hanzi
                );

                const color = calculateColor({
                  tone: selectedComp?.tone_level,
                });

                return (
                  <button
                    key={`${prop.hanzi}-chars-${idx}`}
                    onClick={() => {
                      setSelectedId(prop.hanzi);
                    }}
                    className={`${
                      // learnedCharacters.includes(prop?.hanzi)
                      learnedCharacters2?.find(
                        (char: any) => char?.hanzi === prop?.hanzi
                      )
                        ? `${color}`
                        : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                        ? "text-yellow-500"
                        : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
                  >
                    {prop?.hanzi}
                  </button>
                );
              })}
        </div>
      )}
    </div>
  );
}
