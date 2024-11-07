import { IComponent } from "@/domain/lesson/component.queries";
import { GenerateAudioDialog } from "./generate-audio-dialog/generate-audio-dialog";
import { UploadAudioButton } from "./upload-audio-button";
import { useState } from "react";

export const AddAudioButtons = ({
  currentPhrase,
}: {
  currentPhrase: IComponent;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex space-x-8 items-center">
      <UploadAudioButton currentPhrase={currentPhrase} />
      <GenerateAudioDialog
        currentPhrase={currentPhrase}
        isOpen={isOpen}
        openDialog={() => {
          setIsOpen(true);
        }}
        closeDialog={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};
