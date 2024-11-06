"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { AddAudioButton } from "../add-audio-button";
import { AudioComponent } from "../audio-component";

export const SelectedCharacterAudio = (props: SelectedCharacterProps) => {
  const { selectedComp2 } = props;

  // const

  return (
    (selectedComp2?.input || selectedComp2?.hanzi) && (
      <div className="my-8">
        {selectedComp2 ? (
          selectedComp2?.audio ? (
            <AudioComponent
              key={JSON.stringify(selectedComp2)}
              currentPhrase={selectedComp2}
            />
          ) : (
            <AddAudioButton
              key={JSON.stringify(selectedComp2)}
              currentPhrase={selectedComp2}
            />
          )
        ) : null}
      </div>
    )
  );
};
