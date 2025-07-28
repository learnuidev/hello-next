import { createIndexDBStore } from "@/libs/index-db/index-db";
import { TextToSpeechProviders } from "./selected-character.constants";

const useCharacterSoundStore = createIndexDBStore({
  name: "use-character-sounds/store",
  handler: (set: any, get: any) => ({
    characterSound: {},

    setCharacterSound: (item: any) => {
      set({
        characterSound: {
          ...get().characterSound,
          [item?.id]: item,
        },
      });
    },
  }),
});

export const useCharacterSoundState = ({
  input,
  lang,
  provider,
}: {
  input: string;
  lang: string;
  provider: TextToSpeechProviders;
}) => {
  const id = `${input}#${lang}#${provider}`;
  const _characterSounds: any = useCharacterSoundStore(
    (state) => state.characterSound
  );

  const characterSound = _characterSounds?.[id];

  const setCharacterSound = useCharacterSoundStore(
    (state) => state.setCharacterSound
  );

  return { setCharacterSound, characterSound };
};
