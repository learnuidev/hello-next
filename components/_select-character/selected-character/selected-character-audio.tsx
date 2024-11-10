"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { IComponent } from "@/domain/lesson/component.queries";
import { useState } from "react";
import { AudioComponent } from "../audio-component";
import { AddAudioButtons } from "./add-audio-buttons";

export const SelectedCharacterAudio = (props: SelectedCharacterProps) => {
  const { selectedComp2, selectedComp } = props;
  const [uploadNew, setUploadNew] = useState(false);

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

      {/* <CharacterTrackButton {...props} /> */}
    </div>
  );
};
