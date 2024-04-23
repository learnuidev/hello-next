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

import { belts, calculateColor } from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/pro-light-svg-icons";
import { faGraduationCap, faLightbulb } from "@fortawesome/pro-thin-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { NMMV2 } from "./v2";
import { Devanagari } from "@/components/devanagari/devanagari";

function NomadMethodMandarin() {
  // const [selectedBelt, setSelectedBelt] = useState<any>(belts?.[0]);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);
  const router = useRouter();

  const selectedId = useSelectedCharacter((state: any) => state?.character);
  // const setSelectedId = useSelectedCharacter(
  //   (state: any) => state?.setCharacter
  // );
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

  const { data: discoveredComponents } = useListComponents({
    discoverOnly: true,
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((seconds) => seconds + 1);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const { data: components } = useListComponents();

  const styles = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" },
  });

  return (
    <Tabs defaultValue="all" className="p-0">
      <div className="my-8 flex justify-between items-center md:mx-12">
        <TabsList className="space-x-8">
          <TabsTrigger
            value="all"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faGlobeAsia} className="text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            value="needs_review"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            // value="learned"
            value="discovered"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
          </TabsTrigger>
        </TabsList>

        <div className="space-x-4">
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
      </div>

      <TabsContent value="all" className="my-8">
        <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
          {components?.length &&
            components
              ?.slice(
                selectedBelt?.minCharacterLevel,
                selectedBelt?.maxCharacterLevel
              )
              .map((prop: any, idx: number) => {
                const selectedComp = components?.find(
                  (component: any) => component?.hanzi === prop?.hanzi
                );

                const color = calculateColor({
                  tone: selectedComp?.tone_level,
                });

                console.log("SELECTED COMP", selectedComp);

                return (
                  <button
                    key={`${prop.hanzi}-chars-${idx}`}
                    onClick={() => {
                      // setSelectedId(prop.hanzi);
                      router.push(`/nmm/${prop.hanzi}`);
                    }}
                    className={`${
                      // learnedCharacters.includes(prop?.hanzi)
                      learnedCharacters2?.find(
                        (char: any) => char?.hanzi === prop?.hanzi
                      )
                        ? `${color}`
                        : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                          ? "text-yellow-500"
                          : selectedComp?.final
                            ? "text-slate-400"
                            : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
                  >
                    {prop?.hanzi}
                  </button>
                );
              })}
        </div>
      </TabsContent>

      {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

      <TabsContent value="discovered" className="my-8">
        <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
          {discoveredComponents?.map((prop: any, idx: number) => {
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
                  router.push(`/nmm/${prop.hanzi}`);
                  // setSelectedId(prop.hanzi);
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
      </TabsContent>
      <TabsContent value="needs_review" className="my-8">
        <div className="mx-4 my-4 md:mx-12 text-black dark:text-white flex flex-wrap items-center justify-center">
          {learnedCharacters2
            ?.filter(
              (character: any) =>
                character?.status !== "learned" &&
                character?.level >= selectedBelt?.minCharacterLevel &&
                character?.level <= selectedBelt?.maxCharacterLevel
            )
            ?.map((prop: any, idx: number) => {
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
                    router.push(`/nmm/${prop.hanzi}`);
                    // setSelectedId(prop.hanzi);
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
      </TabsContent>
    </Tabs>
  );
}

function NomadMethodBody({ lang }: { lang: string }) {
  if (["ne", "nep", "nepali"]?.includes(lang)) {
    return <Devanagari />;
  }

  return <NomadMethodMandarin />;
}

export default function NomadMethodPage(props: any) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <div className="grow">
      <NavBar />

      <NomadMethodBody lang={lang} />
    </div>
  );
}
