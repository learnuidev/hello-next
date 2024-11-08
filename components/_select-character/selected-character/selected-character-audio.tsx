"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { AddAudioButtons } from "./add-audio-buttons";
import { AudioComponent } from "../audio-component";
import { IComponent } from "@/domain/lesson/component.queries";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useState } from "react";

export const SelectedCharacterAudio = (props: SelectedCharacterProps) => {
  const { selectedComp2 } = props;
  const [uploadNew, setUploadNew] = useState(false);

  const isSuperAdmin = useIsSuperAdmin();

  return (
    (selectedComp2?.input || selectedComp2?.hanzi) && (
      <div className="my-8 flex justify-start space-x-8 items-center">
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
    )
  );
};
