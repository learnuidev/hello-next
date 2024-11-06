import { IComponent } from "@/domain/lesson/component.queries";
import { GenerateAudioDialog } from "./generate-audio-dialog/generate-audio-dialog";
import { UploadAudioButton } from "./upload-audio-button";

export const AddAudioButtons = ({
  currentPhrase,
}: {
  currentPhrase: IComponent;
}) => {
  return (
    <div className="flex space-x-8 items-center">
      <UploadAudioButton currentPhrase={currentPhrase} />
      <GenerateAudioDialog currentPhrase={currentPhrase} />
    </div>
  );
};
