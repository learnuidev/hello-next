import { Icons } from "@/components/ui/icons.v2";

import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";

import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { useAudioBookState } from "@/app/(auth)/convos/audiobook-player/hooks/use-audiobook-state";
import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { TheDock } from "@/components/the-dock";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { SeriesContentDetails } from "@/domain/content-v2/series-content-details.types";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { ContentCharacterMenuBar } from "./content-character-menu-bar";
import { ContentParagraphView } from "./content-paragraph-view";

export const ContentPlayerCore = ({
  content,
}: {
  content: SeriesContentDetails;
}) => {
  const {
    seekAndPlay,
    setLoop,
    loop,
    setIsReady,
    setDuration,
    setPlaying,
    playing,
    currentTranscription,
    containsChinglish,
    playerRef,
    playbackRate,
    setCurrentTime,
    seekBefore,
    handlePlayPause,
    duration,
    seekAfter,
    currentTime,
    handleSeekChange,
    onReady,
    start,
    seek,
    transcriptions,
    isVideo,
    finalUrl,
  } = useAudioBookState(content as any);

  console.log("CURRENT T", currentTranscription);

  const showEn = useBrightModeStore((state) => state.showEn);
  const editMode = useContentEditStore((state) => state.editMode);
  const isAutomatic = useShowAutomaticallyTheDock();

  if (!content) {
    return null;
  }

  return (
    <>
      <ContentCharacterMenuBar
        seekAndPlay={seekAndPlay}
        contentId={content.id}
        lang={content.lang}
      />
      <div className="relative min-h-screen">
        {!isVideo && (
          <ReactPlayer
            key={finalUrl}
            playbackRate={playbackRate}
            progressInterval={100}
            url={finalUrl}
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            width="0"
            height="0"
            onReady={onReady}
            playing={playing}
            controls={false}
            ref={playerRef}
            onProgress={(value) => {
              setCurrentTime(value.playedSeconds);
            }}
          />
        )}

        {editMode ? (
          <div className={cn("sm:px-8 w-full")}>
            <div className="p-8 text-center">
              Edit mode for transcriptions is not yet implemented for this
              player type.
            </div>
          </div>
        ) : (
          <div
            className={cn(
              isVideo
                ? "grid grid-cols-12 gap-4 pb-24"
                : "flex flex-col gap-4 sm:px-8 w-full pb-24"
            )}
          >
            {isVideo && (
              <div className="col-span-12 md:col-span-7 relative bg-black rounded-lg overflow-hidden shadow-lg">
                <ReactPlayer
                  key={finalUrl}
                  playbackRate={playbackRate}
                  progressInterval={100}
                  url={finalUrl}
                  onPlay={() => {
                    setPlaying(true);
                  }}
                  onPause={() => setPlaying(false)}
                  width="100%"
                  height="auto"
                  onReady={onReady}
                  playing={playing}
                  controls={true}
                  ref={playerRef}
                  onProgress={(value) => {
                    setCurrentTime(value.playedSeconds);
                  }}
                />
              </div>
            )}
            <div
              className={cn(
                isVideo
                  ? "col-span-12 md:col-span-5 h-[600px] md:h-auto overflow-y-auto"
                  : "w-full max-w-4xl mx-auto"
              )}
            >
              <ContentParagraphView
                content={content}
                currentTranscription={currentTranscription}
                currentTime={currentTime}
                seek={seek}
                isPlaying={playing}
                transcriptions={transcriptions}
              />
            </div>
          </div>
        )}

        <TheDock className="bottom-2" isAutomatic={isAutomatic}>
          <div
            className={cn(
              "transition",
              "flex items-center w-full justify-center"
            )}
          >
            <div className="overflow-y-auto px-8 py-2 bg-gray-50 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
              <div className="space-x-4 flex justify-center items-center w-full">
                <button
                  className={cn(
                    "text-xl",
                    loop
                      ? "dark:text-white text-black"
                      : "dark:text-gray-500 text-gray-300"
                  )}
                  onClick={() => {
                    setLoop((prevLoop: any) => {
                      if (prevLoop) {
                        return null;
                      }
                      return currentTranscription || null;
                    });
                  }}
                >
                  <Icons.loop className="transition" />
                </button>

                <button
                  onClick={seekBefore}
                  className="text-xl dark:hover:text-white hover:text-black text-gray-500 transition"
                >
                  <Icons.rotateLeft className="transition" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="sm:text-2xl text-[16px] w-4 dark:text-white text-black"
                >
                  {playing ? <Icons.pause /> : <Icons.play />}
                </button>

                <button
                  onClick={seekAfter}
                  className="text-xl dark:hover:text-white hover:text-black text-gray-500 transition"
                >
                  <Icons.rotateRight className="transition" />
                </button>

                <p className="font-extralight w-20 text-xl text-center dark:text-slate-300 text-slate-600">
                  {formatTime(isNaN(currentTime) ? 0 : currentTime)}
                </p>

                <>
                  <PinyinButton className="text-lg" />
                  <EnButton className="text-lg" />
                  <ReadModeButton className="text-lg" />
                  {showEn && containsChinglish && (
                    <ChinglishButton className="text-lg" />
                  )}
                </>

                <PreviewButton />
              </div>

              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </div>
          </div>
        </TheDock>
      </div>
    </>
  );
};
