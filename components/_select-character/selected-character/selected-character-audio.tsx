"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { AddAudioButtons } from "./add-audio-buttons";
import { AudioComponent } from "../audio-component";
import { IComponent } from "@/domain/lesson/component.queries";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useState } from "react";
import { Icons } from "@/components/ui/icons.v2";
import { useIsContentTrackingEnabled } from "@/domain/user/use-is-content-tracking-enabled";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";

export const SelectedCharacterAudio = (props: SelectedCharacterProps) => {
  const { selectedComp2, selectedComp } = props;
  const [uploadNew, setUploadNew] = useState(false);

  const characterItem = selectedComp;

  const isContentTrackingEnabled = useIsContentTrackingEnabled();

  const updateCharacterMutation = useUpdateCharacterStatusMutation();

  const isSuperAdmin = useIsSuperAdmin();

  return (
    <div className="my-8 flex justify-between items-center w-full">
      {(selectedComp2?.input || selectedComp2?.hanzi) && (
        <div className="flex justify-start space-x-8 items-center">
          {selectedComp2 ? (
            selectedComp2?.audio && !uploadNew ? (
              <AudioComponent
                key={JSON.stringify(selectedComp2)}
                currentPhrase={selectedComp2}
              />
            ) : !isSuperAdmin ? null : (
              <AddAudioButtons
                closeUploadNew={() => {
                  setUploadNew(false);
                }}
                uploadNew={uploadNew}
                key={JSON.stringify(selectedComp2)}
                currentPhrase={selectedComp2 as IComponent}
              />
            )
          ) : null}

          {selectedComp2 &&
            selectedComp2?.audio &&
            isSuperAdmin &&
            !uploadNew && (
              <div>
                <button
                  onClick={() => {
                    setUploadNew(true);
                  }}
                >
                  Upload New{" "}
                </button>
              </div>
            )}
        </div>
      )}

      {isContentTrackingEnabled && (
        <button
          className={
            characterItem?.track
              ? "dark:text-white text-black"
              : "text-gray-500"
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
      )}
    </div>
  );
};
