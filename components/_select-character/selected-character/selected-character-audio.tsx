"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { IComponent } from "@/domain/lesson/component.queries";
import { useState } from "react";
import { AudioComponent } from "../audio-component";
import { AddAudioButtons } from "./add-audio-buttons";
import { useListCharacterContentsQuery } from "@/domain/character-contents/use-list-character-contents-query";
import { useAddCharacterContentMutation } from "@/domain/character-contents/use-add-character-contents-mutation";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";

export const SelectedCharacterAudio = (props: SelectedCharacterProps) => {
  const { selectedComp2, selectedComp } = props;
  const [uploadNew, setUploadNew] = useState(false);

  const { data } = useListCharacterContentsQuery(props.characterId);

  const containsAudios = data?.filter((item: any) =>
    ["wav", "mp3"]?.includes(item?.extension)
  );
  const containsAudio = containsAudios?.[containsAudios?.length - 1];

  const addCharacterContentMutation = useAddCharacterContentMutation();

  const isSuperAdmin = useIsSuperAdmin();

  if (containsAudio) {
    return (
      <div className="px-2 space-x-8 flex items-center">
        <AudioComponent
          key={JSON.stringify(containsAudio)}
          currentPhrase={containsAudio}
        />

        <UploadFileButton
          onSuccess={(resp) => {
            addCharacterContentMutation.mutateAsync({
              content: props.characterId,
              ...resp,
            });
          }}
        >
          Upload Another
        </UploadFileButton>
      </div>
    );
  } else {
    if (isSuperAdmin) {
      return (
        <UploadFileButton
          onSuccess={(resp) => {
            addCharacterContentMutation.mutateAsync({
              content: props.characterId,
              ...resp,
            });
          }}
        />
      );
    }
  }

  return (
    (selectedComp2?.input || selectedComp2?.hanzi) && (
      <div className="my-8 flex justify-between items-center w-full">
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
      </div>
    )
  );
};
