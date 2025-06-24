"use client";

import { Icons } from "../../ui/icons.v2";

import Link from "next/link";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useGetCharacter } from "@/hooks/use-get-character";

import { hanziToSentences } from "./utils/hanzi-to-sentences";

const ZoomedCharacterItem = ({
  sentence,
}: {
  sentence: { input: string; hanzi: string; lang: string };
}) => {
  const addCharacterMutation = useAddCharacterMutation();

  const character = useGetCharacter({ characterId: sentence?.input });

  if (!character) {
    return (
      <div className="text-extralight">
        <p> {sentence?.input}</p>

        <button
          disabled={addCharacterMutation.isPending}
          onClick={() => {
            addCharacterMutation?.mutateAsync({
              lang: sentence?.lang,
              status: "DISCOVERED",
              story: "todo",
              hanzi: sentence?.input,
              journeyId: "default",
            });
          }}
        >
          {addCharacterMutation.isPending ? (
            <Icons.spinner spinPulse />
          ) : addCharacterMutation.isSuccess ? (
            <Icons.checkCircle className="transition" />
          ) : (
            <Icons.discover />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="font-light text-lg">
      <p className="font-light text-gray-400">{character?.pinyin}</p>
      <Link
        href={`/nmm/${sentence?.input}?lang=zh`}
        target="_blank"
        className="font-light"
      >
        {" "}
        {sentence?.input}
      </Link>

      <p className="font-extralight text-gray-500">{character?.en}</p>
    </div>
  );
};

export const ZoomedCharacter = ({ characterId }: { characterId: string }) => {
  const sents = hanziToSentences(characterId) as {
    input: string;
    hanzi: string;
    lang: string;
  }[];

  return (
    <div className="space-y-12 mt-12">
      {sents?.map((item) => {
        return (
          <ZoomedCharacterItem key={JSON.stringify(item)} sentence={item} />
        );
      })}
    </div>
  );
};
