"use client";

import { useGetCharacterId } from "@/app/(auth)/character/[character-id]/use-get-character-id";
import { SelectedCharacterProps } from "../select-character.types";

import { Icons } from "@/components/ui/icons.v2";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useIsContentTrackingEnabled } from "@/domain/user/use-is-content-tracking-enabled";
import { useGetCharacter } from "@/hooks/use-get-character";
import { useListTrackableCharactersQuery } from "@/hooks/use-list-trackable-characters";

export const CharacterTrackButton = () => {
  const characterId = useGetCharacterId();
  const characterItem = useGetCharacter({ characterId });

  const trackableCharacters = useListTrackableCharactersQuery();
  const isContentTrackingEnabled = useIsContentTrackingEnabled();

  //   console.log("TRACKABLE CHARACTERS", trackableCharacters);

  const updateCharacterMutation = useUpdateCharacterStatusMutation();

  return (
    isContentTrackingEnabled &&
    characterItem?.id && (
      <button
        className={
          characterItem?.track ? "dark:text-white text-black" : "text-gray-500"
        }
        disabled={updateCharacterMutation?.isLoading}
        onClick={() => {
          updateCharacterMutation.mutateAsync({
            characterId: characterItem?.id,
            track: !Boolean(characterItem?.track),
          });

          // speak(selectedCompInput);
        }}
      >
        {updateCharacterMutation?.isLoading ? (
          <Icons.spinner spinPulse />
        ) : (
          <Icons.track className="text-2xl" />
        )}
      </button>
    )
  );
};
