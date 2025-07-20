import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useListenState } from "../../../hooks/use-listen-state";
import { UploadAudioButtonListen } from "../upload-audio-button-listen";

export function MediaSettingsDialog({
  isOpen,
  closeDialog,
  mediaId,
}: {
  isOpen: boolean;
  closeDialog: () => void;
  mediaId: string;
}) {
  const { playbackRate, setPlaybackRate } = useListenState();
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black left-[50%] top-[50%] translate-x-[-50%] bottom-6 data-[state=closed]:slide-out-to-bottom-16 data-[state=open]:slide-in-from-bottom-16"
      >
        <section className="mt-4 h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
          <h2 className="text-2xl text-center pt-2"> Settings</h2>

          <div className="px-12 my-8">
            <div className="flex justify-between items-center text-xl mb-2">
              <Label className="mb-2 text-xl"> Playback Speed</Label>

              <p className="text-4xl">{playbackRate}x</p>
            </div>
            <Slider
              className="mt-4"
              min={0.5}
              max={2.5}
              value={[playbackRate]}
              step={0.1}
              onValueChange={(value) => {
                setPlaybackRate(value[0]);
              }}
            />
          </div>

          <div className="mt-12 px-12 flex justify-center w-full">
            <UploadAudioButtonListen
              className="w-full"
              mediaId={mediaId}
              text={"Add a new audio"}
            />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
