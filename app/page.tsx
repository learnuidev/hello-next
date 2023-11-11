// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";

import { Editor } from "@/components/Editor";
import { useEffect, useState } from "react";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";
import { Wordle } from "@/components/wordle/game";
import { NomadMethod } from "./nmm/nomad-method";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { cleanString } from "@/data/convos/bm1/utils";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data: components, isLoading } = useListComponentsQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: allAnswers } = useListAnswersQuery();

  const { data: learnedCharacters, isLoading: isCharactersLoading } =
    useListCharactersQuery();

  useEffect(() => {
    const firstUnlearnedAndDiscoveredCharacter = components?.filter(
      (component: any) => {
        return (
          !learnedCharacters?.find(
            (char: any) => char?.hanzi === component?.hanzi
          ) &&
          allAnswers?.find((answer: any) =>
            answer?.hanzi?.includes(component?.hanzi)
          )
        );
      }
    )?.[0];

    if (firstUnlearnedAndDiscoveredCharacter) {
      setSelectedId(firstUnlearnedAndDiscoveredCharacter?.hanzi);
    } else {
      const firstUnlearnedCharacter = components?.filter((component: any) => {
        return !learnedCharacters?.find(
          (char: any) => char?.hanzi === component?.hanzi
        );
      })?.[0];

      if (firstUnlearnedCharacter) {
        setSelectedId(firstUnlearnedCharacter?.hanzi);
      }
    }
  }, [components, learnedCharacters, allAnswers]);

  return (
    // <main className="">
    //   <NavBar />
    //   {/* <NavigatorMap /> */}

    //   <SearchPage />
    // </main>

    <main className="">
      <NavBar />

      {isLoading || isCharactersLoading ? null : (
        <NomadMethod selectedId={selectedId} />
      )}

      {/* <Wordle /> */}

      {/* <div className="px-4 md:px-32 md:my-4">
        <Editor content="Hello" id="home page" />
      </div> */}
    </main>
  );
}
