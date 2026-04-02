import { Slider } from "@/components/ui/slider";

import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";

import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useContextPlayContextState } from "@/components/youtube-page/hooks/use-play-history-state";
import { KaraokeMode } from "@/components/youtube-page/karaoke-mode";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { isVideoUrl } from "../utils/is-video-url";
import { isYoutube } from "../utils/is-youtube";
import { AllTranscriptionsEditor } from "./components/all-transcriptions-editor";
import { AudioBookPlayerControls } from "./components/audiobook-player-controls";
import { CharacterMenuBar } from "./components/character-menu-bar";
import { ReaderViewParent } from "./components/reader-view-parent";
import { useAudioBookState } from "./hooks/use-audiobook-state";
import { ParaView } from "./components/para-view";

export const AudiobookPlayerCore = ({ content }: { content: IContent }) => {
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
  } = useAudioBookState(content);

  const isYoutubeOrVideo =
    isYoutube(content?.audio) || isVideoUrl(content?.audio);

  const viewMode = usePlayerViewModeStore((state) => state.viewMode);

  const showEn = useBrightModeStore((state) => state.showEn);

  const { contextId, setNewContextId } = useContextPlayContextState();

  const editMode = useContentEditStore((state) => state.editMode);

  const isSmall = useIsSmall();
  const isVideoHidden = usePlayerViewModeStore((state) => state.isVideoHidden);

  if (!content) {
    return;
  }

  const progressInterval = 100;

  // console.log("VIEW MODE", viewMode);

  return (
    <MandoContextMenu lang={content?.lang || ""}>
      <CharacterMenuBar
        seekAndPlay={seekAndPlay}
        contentId={content.id}
        lang={content.lang}
      />
      <div className="relative">
        {editMode ? (
          <div className={cn("sm:px-8  w-full")}>
            <AllTranscriptionsEditor
              contentId={content.id}
              currentTime={currentTime}
              seekAndPlay={seekAndPlay}
            />
          </div>
        ) : (
          <div
            className={cn(
              "grid grid-cols-12 gap-8 sm:px-8 scroll-px-80 w-full"
            )}
          >
            <div
              className={cn(
                isVideoHidden
                  ? "col-span-12"
                  : isYoutubeOrVideo
                    ? "sm:col-span-6 col-span-12"
                    : "md:col-span-8 col-span-12"
              )}
            >
              {editMode ? (
                <AllTranscriptionsEditor
                  contentId={content.id}
                  currentTime={currentTime}
                  seekAndPlay={seekAndPlay}
                />
              ) : viewMode === "karaoke" ? (
                <div
                  className={
                    isVideoHidden || !isYoutubeOrVideo
                      ? "col-span-12 mx-2 sm:mx-12 md:mx-32"
                      : "col-span-12 md:col-span-5"
                  }
                >
                  <div
                    className={
                      isVideoHidden || !isYoutubeOrVideo
                        ? "col-span-12 mx-2 sm:mx-12 md:mx-32"
                        : "col-span-12 md:col-span-5"
                    }
                  >
                    <KaraokeMode
                      lang={content?.lang}
                      isPlaying={playing}
                      containsChinglish={containsChinglish}
                      seekTo={(time: number) => {
                        playerRef.current.seekTo(time, "seconds");

                        try {
                          playerRef.current?.player?.player?.play();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      play={() => {
                        try {
                          playerRef.current?.player?.player?.play();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      transcriptions={content.transcriptions}
                      currentTime={currentTime}
                    />
                  </div>
                </div>
              ) : viewMode === "reader" ? (
                <div>
                  <ReaderViewParent
                    content={content}
                    currentTranscription={currentTranscription}
                    currentTime={currentTime}
                    seek={seek}
                    isPlaying
                  />
                </div>
              ) : (
                <ParaView
                  content={content}
                  currentTranscription={currentTranscription}
                  currentTime={currentTime}
                  seekAndPlay={seekAndPlay}
                  isPlaying
                />
              )}
            </div>

            {isYoutubeOrVideo && (
              <div
                className={cn(
                  "md:col-span-6 col-span-12 sm:mt-12",

                  `${isVideoHidden || !isYoutubeOrVideo ? "hidden" : ""}`
                )}
              >
                <ReactPlayer
                  key={content?.audio}
                  playbackRate={playbackRate}
                  progressInterval={progressInterval}
                  url={content?.audio}
                  onPlay={() => {
                    setNewContextId();

                    setPlaying(true);
                  }}
                  onPause={() => setPlaying(false)}
                  width="100%"
                  height={isSmall ? "200px" : "450px"}
                  onReady={onReady}
                  playing={false}
                  controls={false}
                  ref={playerRef}
                  onProgress={(value) => {
                    setCurrentTime(value.playedSeconds);
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="fixed bottom-2 w-full">
          <div className="w-full max-w-4xl mx-auto p-4 py-2">
            {isYoutubeOrVideo ? null : (
              <ReactPlayer
                key={content?.audio}
                playbackRate={playbackRate}
                progressInterval={progressInterval}
                url={content?.audio}
                onPlay={() => {
                  setNewContextId();

                  setPlaying(true);
                }}
                onPause={() => setPlaying(false)}
                width="100%"
                height="50px"
                onReady={onReady}
                playing={false}
                controls={false}
                ref={playerRef}
                onProgress={(value) => {
                  setCurrentTime(value.playedSeconds);
                }}
              />
            )}

            <div className="p-4 bg-gray-100 dark:bg-[rgb(15,16,17)] mb-2">
              <AudioBookPlayerControls
                loop={loop}
                setLoop={setLoop}
                currentTranscription={currentTranscription}
                seekBefore={seekBefore}
                seekAfter={seekAfter}
                handlePlayPause={handlePlayPause}
                playing={playing}
                showEn={showEn}
                containsChinglish={containsChinglish}
                isYoutubeOrVideo={isYoutubeOrVideo}
              />

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
        </div>
      </div>
    </MandoContextMenu>
  );
};
