import { Icons } from "@/components/ui/icons.v2";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { cn } from "@/lib/utils";
import { formatTime } from "../_play/utils";
import { useFocusMode } from "./hooks/use-focus-mode";
import { useFocusIndex } from "./hooks/use-focus-index";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useUpsetContentAnalyticsHandler } from "../[content-id]/hooks/use-upsert-content-analytics-handler";
import { PreviewButton } from "@/components/settings-dialog/preview-button";

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
  isFocusKaraokeMode,
  audioUrl,
  seekBefore,
  seekAfter,
}: any) => {
  const { focusMode, setFocusMode } = useFocusMode(contentId);
  const { focusIndex, setFocusIndex } = useFocusIndex(contentId);

  const { upsertContentAnalyticsHandler } =
    useUpsetContentAnalyticsHandler(contentId);

  const setShowPinyin = useBrightModeStore((state: any) => state.setShowPinyin);

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

        {isFocusKaraokeMode && !audioUrl ? (
          <div className="sm:space-x-6 space-x-8 flex items-center">
            <button
              className="text-2xl"
              onClick={() => {
                const newFocusIndex = Math.max(0, focusIndex - 1);
                setFocusIndex(newFocusIndex);

                upsertContentAnalyticsHandler({ focusIndex: newFocusIndex });
              }}
            >
              <Icons.arrowLeft />
            </button>

            <button
              className={cn("text-2xl")}
              onClick={() => {
                const newFocusIndex = Math.min(
                  content?.transcriptions?.length - 1,
                  focusIndex + 1
                );
                setFocusIndex(newFocusIndex);

                upsertContentAnalyticsHandler({ focusIndex: newFocusIndex });
              }}
            >
              <Icons.arrowRight />
            </button>
          </div>
        ) : (
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
              // disabled={!activeSubtitle}
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
            <button
              className="sm:text-2xl text-[16px] dark:hover:text-white hover:text-black text-gray-500"
              onClick={() => {
                seekBefore();
              }}
            >
              <Icons.rotateLeft />
            </button>
            <button
              className="sm:text-2xl text-[16px] dark:hover:text-white hover:text-black text-gray-500"
              onClick={() => {
                seekAfter();
              }}
            >
              <Icons.rotateRight />
            </button>
          </div>
        )}

        {isFocusKaraokeMode && !audioUrl ? (
          <div className="space-x-4 sm:space-x-8 flex items-center justify-start mr-8 sm:mr-60">
            <button
              onClick={() => {
                togglePinyin((pinyin: any) => !pinyin);
                setShowPinyin((showPinyin: any) => !showPinyin);
              }}
            >
              <div
                className={cn(
                  "sm:text-2xl text-[16px]",
                  viewPinyin ? "dark:text-white text-black" : "text-gray-400"
                )}
              >
                P
              </div>
            </button>
            {/* <button
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
            </button> */}

            <PreviewButton
              className={cn(
                "sm:text-2xl text-[16px]",
                brightMode ? "dark:text-white text-black" : "text-gray-400"
              )}
            />
            <button
              onClick={() => {
                setFocusMode(!focusMode);
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
        ) : (
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
                setShowPinyin((showPinyin: any) => !showPinyin);
              }}
            >
              <div
                className={cn(
                  "sm:text-2xl text-[16px]",
                  viewPinyin ? "dark:text-white text-black" : "text-gray-400"
                )}
              >
                P
              </div>
            </button>

            <PreviewButton
              className={cn(
                "sm:text-2xl text-[16px]",
                brightMode ? "dark:text-white text-black" : "text-gray-400"
              )}
            />

            <button
              onClick={() => {
                setFocusMode(!focusMode);
                upsertContentAnalyticsHandler({ focusMode: !focusMode });
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
        )}
      </section>
    </div>
  );
};
