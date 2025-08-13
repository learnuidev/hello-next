import { Icons } from "@/components/ui/icons.v2";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { cn } from "@/lib/utils";
import { formatTime } from "../_play/utils";

export const PlayerSettings = ({
  contentId,
  editMode,
  increaseFontSize,
  decreaseFontSize,
  togglePlay,
  isPlaying,
  loop,
  activeSubtitle,
  currentTime,
  setLoop,
  textSizeIndex,
  reset,
  updateContentMutation,
  setEditMode,
  viewMode,
  brightMode,
  content,
  times,
  togglePinyin,
  viewPinyin,
  setBrightMode,
  setFocusMode,
  focusMode,
}: any) => {
  return (
    <div className="w-full fixed bottom-0 py-4 px-4 z-30 m-auto bg-gray-50 dark:bg-[rgb(12,13,14)]">
      <section className="flex items-center justify-between">
        {editMode ? null : (
          <div className="space-x-2">
            <button
              onClick={increaseFontSize}
              className={cn(
                textSizeIndex === 3 ? "text-gray-400" : "",
                "text-2xl"
              )}
            >
              A
            </button>

            <button
              onClick={decreaseFontSize}
              className={textSizeIndex === 0 ? "text-gray-400" : ""}
            >
              A
            </button>
          </div>
        )}

        <div className="sm:space-x-6 space-x-2 flex items-center">
          <button
            className="sm:text-2xl text-[16px]"
            onClick={() => {
              togglePlay();
            }}
          >
            {isPlaying ? <Icons.pause /> : <Icons.play />}
          </button>

          <button
            className={cn(
              "sm:text-2xl text-[16px]",
              loop
                ? "dark:text-white text-black font-bold"
                : "dark:text-gray-600 text-gray-300"
            )}
            disabled={!activeSubtitle}
            onClick={() => {
              setLoop((loop: any) => {
                if (loop) {
                  return null;
                }

                return activeSubtitle?.input;
              });
            }}
          >
            <Icons.loop />
          </button>

          <p className="font-extralight sm:text-2xl text-[16px] text-center dark:text-slate-300 text-slate-600">
            {formatTime(currentTime)}
          </p>

          <button
            className="sm:text-2xl text-[16px]"
            onClick={() => {
              reset();
            }}
          >
            <Icons.stop />
          </button>
        </div>

        <div className="space-x-4 sm:space-x-8 flex items-center justify-start mr-8 sm:mr-60">
          <UploadFileButton
            icon={<Icons.upload className="text-[16px] sm:text-2xl" />}
            types={["mp3", "m4a", "mp4"]}
            className="hidden sm:block"
            onSuccess={(res) => {
              return updateContentMutation.mutateAsync({
                id: contentId || "",
                audio: res.sourceUrl,
                audioUploadBucketKey: res.uploadBucketKey,
                audioS3LinkAddedAt: Date.now(),
                updateContent: true,
              });
            }}
          />

          <button
            onClick={() => {
              setEditMode();
            }}
          >
            <Icons.gear
              className={cn(
                "sm:text-2xl text-[16px]",
                editMode ? "dark:text-white text-black" : "text-gray-400"
              )}
            />
          </button>

          {editMode && (
            <button
              onClick={() => {
                const editedTranscriptions = {
                  id: content?.id,
                  transcriptions: content?.transcriptions?.map(
                    (transcription: any) => {
                      const time = times?.find(
                        (t: any) => t?.id === transcription?.id
                      ) as any;
                      return {
                        ...transcription,
                        ...time,
                      };
                    }
                  ),
                };

                updateContentMutation
                  .mutateAsync({
                    ...editedTranscriptions,
                  })
                  .then(() => {
                    setEditMode();
                    // resetTimes();
                  });
              }}
            >
              {updateContentMutation.isPending ? "Saving..." : "Save"}
            </button>
          )}

          <button
            onClick={() => {
              togglePinyin((pinyin: any) => !pinyin);
            }}
          >
            <Icons.language
              className={cn(
                "sm:text-2xl text-[16px]",
                viewPinyin ? "dark:text-white text-black" : "text-gray-400"
              )}
            />
          </button>
          <button
            onClick={() => {
              setBrightMode((mode: any) => !mode);
            }}
          >
            <Icons.glassesRound
              className={cn(
                "sm:text-2xl text-[16px]",
                brightMode ? "dark:text-white text-black" : "text-gray-400"
              )}
            />
          </button>
          <button
            onClick={() => {
              setFocusMode((mode: any) =>
                typeof mode === "number" ? null : 0
              );
            }}
          >
            <Icons.bullsEyeArrow
              className={cn(
                "sm:text-2xl text-[16px]",
                typeof focusMode === "number"
                  ? "dark:text-white text-black"
                  : "text-gray-400"
              )}
            />
          </button>
        </div>
      </section>
    </div>
  );
};
