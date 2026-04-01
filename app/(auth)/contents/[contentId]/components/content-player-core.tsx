import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";

import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";

import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { ContentEditButton } from "@/components/youtube-page/content-edit-button";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { SeriesContentDetails } from "@/domain/content-v2/series-content-details.types";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { ContentParagraphView } from "./content-paragraph-view";
import { useContentPlayerState } from "../hooks/use-content-player-state";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { ContentCharacterMenuBar } from "./content-character-menu-bar";

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
  } = useContentPlayerState(content);

  const showEn = useBrightModeStore((state) => state.showEn);

  const editMode = useContentEditStore((state) => state.editMode);

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
      <div className="relative">
        {editMode ? (
          <div className={cn("sm:px-8  w-full")}>
            <div className="p-8 text-center">
              Edit mode for transcriptions is not yet implemented for this
              player type.
            </div>
          </div>
        ) : (
          <div
            className={cn(
              isVideo
                ? "grid grid-cols-2 h-screen gap-0"
                : "grid grid-cols-12 gap-8 sm:px-8 scroll-px-80 w-full",
            )}
          >
            {isVideo && (
              <div className="relative bg-black">
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
                  height="100%"
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
                  ? "h-screen overflow-y-auto"
                  : "md:col-span-8 col-span-12",
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

        {!isVideo && (
          <div className="fixed bottom-2 w-full">
            <div className="w-full max-w-3xl mx-auto p-4 py-2">
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
                height="50px"
                onReady={onReady}
                playing={playing}
                controls={false}
                ref={playerRef}
                onProgress={(value) => {
                  setCurrentTime(value.playedSeconds);
                }}
              />

              <div className="flex items-center justify-center sm:gap-8 gap-4 bg-gray-50 dark:bg-black p-4 rounded-2xl shadow-sm mb-4">
                <ContentEditButton />
                <button
                  className={cn(
                    "text-xl",
                    loop
                      ? "dark:text-white text-black font-bold"
                      : "dark:text-gray-600 text-gray-300",
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
                  <Icons.loop />
                </button>
                <button onClick={seekBefore} className="p-2 rounded-full ">
                  <Icons.rotateLeft className="text-xl" />
                </button>

                <button onClick={handlePlayPause} className="rounded-full">
                  {playing ? (
                    <Icons.pause className="text-2xl" />
                  ) : (
                    <Icons.play className="text-2xl" />
                  )}
                </button>

                <button onClick={seekAfter} className="rounded-full ">
                  <Icons.rotateRight className="text-xl" />
                </button>

                <>
                  <PinyinButton className="text-2xl" />

                  <EnButton className="text-2xl" />

                  <ReadModeButton className="text-2xl" />
                  {showEn && containsChinglish && (
                    <ChinglishButton className="text-2xl" />
                  )}
                </>

                <PreviewButton />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm">{formatTime(currentTime)}</span>
                <Slider
                  min={0}
                  max={duration}
                  step={1}
                  value={[currentTime]}
                  defaultValue={[currentTime]}
                  onValueChange={handleSeekChange}
                  className="w-full"
                />
                <span className="text-sm">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
