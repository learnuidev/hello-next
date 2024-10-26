"use client";

import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

export default function Doctor() {
  const { data: components } = useListComponents({});

  const { data: characters } = useListCharactersQuery({});

  const updateCharacter = useUpdateCharacterStatusMutation();

  const characterWithOutGroupAndToneLevel = characters
    ?.filter((char) => !char?.tone_level && char?.hanzi?.length === 1)
    .map((char) => {
      const comp = components?.find((c) => c?.hanzi === char?.hanzi);
      return {
        characterId: char.id,
        hanzi: char.hanzi,
        lang: char?.lang || comp?.lang,
        tone_level: comp?.tone_level,
        group: char.group || comp?.group,
      };
    })
    ?.filter((char) => char?.lang === "zh")
    ?.slice(0, 100);

  const mutateAll = async () => {
    if (characterWithOutGroupAndToneLevel !== undefined) {
      return Promise.all(
        characterWithOutGroupAndToneLevel?.map(async (char) => {
          return updateCharacter.mutateAsync(char);
        })
      );
    }

    return null;
  };

  return (
    <div className="m-8">
      <button
        className="bg-gray-800 px-4 py-2"
        onClick={() => {
          mutateAll().then(() => {
            alert("DONE");
          });
        }}
      >
        {" "}
        Mutate All
      </button>

      <code>
        <pre>{JSON.stringify(characterWithOutGroupAndToneLevel, null, 2)}</pre>
      </code>
    </div>
  );
}
