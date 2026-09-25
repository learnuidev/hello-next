import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";

import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { useContextPlayContextState } from "@/components/youtube-page/hooks/use-play-history-state";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { useMemo } from "react";
import { isVideoUrl } from "../utils/is-video-url";
import { isYoutube } from "../utils/is-youtube";
import { AllTranscriptionsEditor } from "./components/all-transcriptions-editor";
import { AudiobookPlayerBar } from "./components/audiobook-player-bar";
import { AudioBookPlayerControls } from "./components/audiobook-player-controls";
import { AudiobookPlayerDock } from "./components/audiobook-player-dock";
import { CharacterMenuBar } from "./components/character-menu-bar";
import { AppleKaraokeView } from "./components/karaoke/apple-karaoke-view";
import { ParaView } from "./components/para-view";
import { useAudioBookState } from "./hooks/use-audiobook-state";
import { getCoverPhotoUrl } from "@/libs/utils/get-cover-photo-url";
import { toContentToCollect } from "@/domain/content-collections/to-content-to-collect";

export const AudiobookPlayerCore = ({
  content,
}: {
  content: IContent & any;
}) => {
  const {
    seekAndPlay,
    setLoop,
    play,
    pause,
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
    dynamicLoop,
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

  // What a playlist would remember about this content, for the singleton view's
  // star — the same snapshot the settings menu saves.
  const contentToCollect = useMemo(
    () => toContentToCollect(content),
    [content],
  );

  if (!content) {
    return;
  }

  const coverPhotoUrl = getCoverPhotoUrl(content);

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
              onClick={() => {
                if (playing) {
                  pause();
                } else {
                  play();
                }
              }}
              className={cn(
                isFSM && isYoutubeOrVideo
                  ? "md:col-span-8 col-span-12"
                  : "md:col-span-6 col-span-12",

                `${isVideoHidden ? "hidden" : ""} cursor-pointer`,
              )}
            >
              <div className="flex justify-center items-center sm:mt-24 mt-4">
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
                  <img
                    className="rounded-2xl aspect-video sm:aspect-square w-full sm:w-[24rem] px-4 sm:px-0"
                    src={content?.backgroundImageUrl}
                  />
                )}
              </div>
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
              {/* {currentTime === 0 && !playing ? ( */}
              {false ? (
                <div className="flex justify-center flex-col items-center sm:mt-48 mt-16">
                  <button
                    onClick={() => {
                      play();
                    }}
                  >
                    <Icons.play className="text-4xl" />
                  </button>

                  <p className="text-gray-500 text-sm mt-4 font-extralight">
                    Click here to play
                  </p>
                </div>
              ) : viewMode === "karaoke" ? (
                <div className="col-span-12 mx-auto w-full max-w-6xl">
                  <AppleKaraokeView
                    contentToCollect={contentToCollect}
                    transcriptions={content.transcriptions}
                    fallbackTranscription={currentTranscription}
                    lang={content?.lang}
                    currentTime={currentTime}
                    isPlaying={playing}
                    playerRef={playerRef}
                    coverUrl={coverPhotoUrl}
                    compact={!isVideoHidden}
                    seekAndPlay={seekAndPlay}
                    onPlay={play}
                    onPause={pause}
                    dynamicLoop={dynamicLoop}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    isVideoHidden ? "col-span-12 mx-auto max-w-4xl" : "",
                    "sm:mt-16 mt-8",
                  )}
                >
                  <ParaView
                    loop={loop}
                    setLoop={setLoop}
                    content={content}
                    currentTranscription={currentTranscription}
                    currentTime={currentTime}
                    seekAndPlay={seekAndPlay}
                    isPlaying={playing}
                    playerRef={playerRef}
                    dynamicLoop={dynamicLoop}
                  />
                </div>
              )}
            </div>
          </div>
        )}

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
            playing={playing}
            controls={false}
            ref={playerRef}
            onProgress={(value) => {
              setCurrentTime(value.playedSeconds);
            }}
          />
        )}
        <AudiobookPlayerDock className="bottom-4 sm:bottom-2">
          <div className="p-4 w-full">
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
              contentId={content.id}
              content={content}
              dynamicLoop={dynamicLoop}
            />

            <AudiobookPlayerBar
              currentTime={currentTime}
              handleSeekChange={handleSeekChange}
              duration={duration}
              transcriptions={content.transcriptions}
              playerRef={playerRef}
              isPlaying={playing}
              dynamicLoop={dynamicLoop}
            />
          </div>
        </AudiobookPlayerDock>
      </div>
    </MandoContextMenu>
  );
};
