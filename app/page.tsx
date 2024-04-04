"use client";

import "@/libs/cognito/init";

import { useEffect, useState } from "react";

import { NavBar } from "@/components/navbar";

import { NomadMethod } from "./nmm/nomad-method";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { cleanString } from "@/data/convos/bm1/utils";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Login } from "@/components/Login";
import { useRouter } from "next/navigation";
import { useListComponents } from "@/domain/lesson/component.queries";

function HomeAuth() {
  const router = useRouter();
  const [isTocHidden, setIsTocHidden] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data: components, isLoading } = useListComponents();

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
    <main className="">
      <NavBar />

      {isLoading || isCharactersLoading ? null : (
        <NomadMethod
          selectedId={selectedId}
          onClose={() => {
            router.push(`/nmm/${selectedId}`);
          }}
        />
      )}
    </main>
  );
}
export default function Home() {
  const { data: authUser, isLoading } = useCurrentAuthUser({});

  if (authUser) {
    return <HomeAuth />;
  }

  return <Login />;

  return (
    <main className="">
      <NavBar />

      <div className="text-center my-16">
        <h1 className="my-16 text-5xl">学习语言的新方法</h1>

        <h3 className="text-xl">通过沉浸感、创造力和想象力来学习中文</h3>
      </div>

      <div></div>
    </main>
  );
}
