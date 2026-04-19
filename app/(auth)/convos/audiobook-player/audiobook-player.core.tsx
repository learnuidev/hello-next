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
import { AudiobookPlayerBar } from "./components/audiobook-player-bar";

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

  const isFSM = usePlayerViewModeStore((state) => state.isFSM);

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

  return (
    <MandoContextMenu lang={content?.lang || ""}>
      <CharacterMenuBar
        seekAndPlay={seekAndPlay}
        contentId={content.id}
        lang={content.lang}
      />
      <div className="relative">
        {editMode ? (
          <div
            className={cn(
              "grid grid-cols-12 gap-4 w-full",

              isFSM ? "px-0" : "sm:gap-8 sm:px-8 scroll-px-80",
            )}
          >
            {isYoutubeOrVideo && (
              <div
                className={cn(
                  "md:col-span-6 col-span-12",

                  `${isVideoHidden || !isYoutubeOrVideo ? "hidden" : ""}`,
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
                  // playing={false}
                  controls={false}
                  ref={playerRef}
                  onProgress={(value) => {
                    setCurrentTime(value.playedSeconds);
                  }}
                />
              </div>
            )}
            <div
              className={cn(
                !isYoutubeOrVideo
                  ? "col-span-12"
                  : isVideoHidden
                    ? "col-span-12"
                    : isYoutubeOrVideo
                      ? "sm:col-span-6 col-span-12"
                      : "md:col-span-8 col-span-12",
              )}
            >
              <AllTranscriptionsEditor
                contentId={content.id}
                currentTime={currentTime}
                seekAndPlay={seekAndPlay}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "grid grid-cols-12 gap-4 w-full",
              isFSM ? "px-0" : "sm:gap-8 sm:px-8 scroll-px-80",
            )}
          >
            <div
              className={cn(
                isFSM && isYoutubeOrVideo
                  ? "md:col-span-8 col-span-12"
                  : "md:col-span-6 col-span-12",

                `${isVideoHidden ? "hidden" : ""}`,
              )}
            >
              {isYoutubeOrVideo ? (
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
                  height={isSmall ? "200px" : isFSM ? "600px" : "450px"}
                  onReady={onReady}
                  // playing={false}
                  controls={false}
                  ref={playerRef}
                  onProgress={(value) => {
                    setCurrentTime(value.playedSeconds);
                  }}
                />
              ) : (
                <div className="flex justify-center items-center sm:mt-24 mt-4">
                  <img
                    className="rounded-2xl aspect-video sm:aspect-square w-full sm:w-[24rem] px-4 sm:px-0"
                    src={content?.backgroundImageUrl}
                  />{" "}
                </div>
              )}
            </div>

            <div
              className={cn(
                isVideoHidden
                  ? "col-span-12"
                  : isFSM && isYoutubeOrVideo
                    ? "md:col-span-4 col-span-12"
                    : "md:col-span-6 col-span-12",
                "sm:px-12",
              )}
            >
              {viewMode === "karaoke" ? (
                <div
                  className={
                    isVideoHidden
                      ? "col-span-12 mx-auto max-w-4xl sm:mt-32 mt-24"
                      : "col-span-12 md:col-span-5"
                  }
                >
                  <div
                    className={
                      isVideoHidden
                        ? "col-span-12"
                        : "col-span-12 md:col-span-5"
                    }
                  >
                    <KaraokeMode
                      currentTranscription={currentTranscription}
                      seekAndPlay={seekAndPlay}
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
                <div
                  className={cn(
                    "sm:mt-32",
                    isVideoHidden
                      ? "col-span-12 mx-auto max-w-4xl sm:mt-32 mt-16"
                      : "",
                  )}
                >
                  <div className={isVideoHidden ? "mx-auto max-w-4xl" : ""}>
                    <ReaderViewParent
                      content={content}
                      currentTranscription={currentTranscription}
                      currentTime={currentTime}
                      isPlaying={playing}
                      loop={loop}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={
                    isVideoHidden
                      ? "col-span-12 mx-auto max-w-4xl sm:mt-32 mt-8"
                      : ""
                  }
                >
                  <ParaView
                    loop={loop}
                    content={content}
                    currentTranscription={currentTranscription}
                    currentTime={currentTime}
                    seekAndPlay={seekAndPlay}
                    isPlaying={playing}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 sm:bottom-2 w-full">
          <div className="w-full max-w-4xl mx-auto sm:p-4 sm:py-2 p-2">
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

            <div className=" dark:bg-auto p-4">
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
                isReaderView={viewMode === "reader"}
              />

              <AudiobookPlayerBar
                currentTime={currentTime}
                handleSeekChange={handleSeekChange}
                duration={duration}
              />
            </div>

            {/* {!editMode && ( */}
          </div>
        </div>
      </div>
    </MandoContextMenu>
  );
};
