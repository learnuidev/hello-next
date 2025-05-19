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
import { useSelectedCharacterData } from "@/components/use-selected-character";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { GenerateAudioDialog } from "./generate-audio-dialog/generate-audio-dialog";

export const SelectedCharacterAudio = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data: charData } = useSelectedCharacterData({ characterId });
  const [isOpen, setIsOpen] = useState(false);

  const [uploadNew, setUploadNew] = useState(false);

  const { data } = useListCharacterContentsQuery(characterId);

  const lang = useGetCurrentLang();

  const { data: meanings } = useListMeaningsQuery({
    content: characterId || "",
    lang,
  });

  const selectedComp2: any = meanings?.details;

  const containsAudios = meanings?.audioUrl;
  const containsAudio = containsAudios?.[containsAudios?.length - 1];

  const addCharacterContentMutation = useAddCharacterContentMutation();

  const isSuperAdmin = useIsSuperAdmin();

  if (containsAudio) {
    return (
      <div className="space-x-8 flex items-center">
        {/* <AudioComponent
          audioUrl={meanings?.audioUrl}
          key={JSON.stringify(containsAudio)}
          currentPhrase={containsAudio}
        /> */}

        {meanings?.id && isSuperAdmin && (
          <GenerateAudioDialog
            meaningId={meanings?.id}
            currentPhrase={selectedComp2}
            isOpen={isOpen || uploadNew}
            openDialog={() => {
              setIsOpen(true);
            }}
            closeDialog={() => {
              setIsOpen(false);
              // closeUploadNew();
            }}
          >
            Generate Another
          </GenerateAudioDialog>
        )}
      </div>
    );
  }

  return (
    (selectedComp2?.input || selectedComp2?.hanzi) &&
    meanings?.id && (
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
                meaningId={meanings?.id}
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
