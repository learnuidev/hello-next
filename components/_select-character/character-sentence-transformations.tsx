"use client";

import { SentenceItem } from "./sentence-item";

import { Nothing } from "@/app/nmm/nothing";

import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

import { AnimatedLoadingText } from "../animated-loading-text";

export const CharacterSentenceTransformations = (props: {
  characterId: string;
  lang: string;
}) => {
  const {
    data: sentences,
    isLoading,
    isError,
  } = useListSentencesQuery({
    component: props.characterId,
    lang: props.lang,
    format: "transformation",
  });

  if (isLoading) {
    return (
      <div className="my-4">
        <AnimatedLoadingText
          className="text-xl font-bold"
          message="Generating sentences..."
        />
      </div>
    );
  }

  if (isError) {
    return <Nothing message={"Error loading sentences"} />;
  }

  return (
    <div className="w-full">
      <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
        {sentences?.slice(0, 10)?.map((sentence: any) => {
          return (
            <SentenceItem
              key={sentence?.id}
              {...props}
              currentPhrase={sentence}
            />
          );
        })}
      </div>
    </div>
  );
};
