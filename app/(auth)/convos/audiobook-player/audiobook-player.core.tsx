import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";

import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import {
  ParagraphButton,
  useParagraphMode,
} from "@/components/settings-dialog/paragraph-button";
import { PreviewButton } from "@/components/settings-dialog/preview-button";
import { ContentEditButton } from "@/components/youtube-page/content-edit-button";
import {
  useContextPlayContextState,
  usePlayHistoryStore,
} from "@/components/youtube-page/hooks/use-play-history-state";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { AllTranscriptionsEditor } from "./components/all-transcriptions-editor";
import { CurrentTranscriptionView } from "./components/current-transcription-view";
import { useAudioBookState } from "./hooks/use-audiobook-state";
import { ParagraphView } from "./components/paragraph-view";
import { ReadModeButton } from "@/components/read-mode-button";
import { CharacterMenuBar } from "./components/character-menu-bar";

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

  const { paragraphMode } = useParagraphMode();

  const setHistory = usePlayHistoryStore((state) => state.setHistory);
  const { contextId, setNewContextId } = useContextPlayContextState();

  const editMode = useContentEditStore((state) => state.editMode);

  if (!content) {
    return;
  }

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
            <div className={cn("md:col-span-8 col-span-12")}>
              {editMode ? (
                <AllTranscriptionsEditor
                  contentId={content.id}
                  currentTime={currentTime}
                  seekAndPlay={seekAndPlay}
                />
              ) : paragraphMode === "paragraph" ? (
                <ParagraphView
                  content={content}
                  currentTranscription={currentTranscription}
                  currentTime={currentTime}
                  seek={seek}
                  isPlaying
                />
              ) : currentTranscription ? (
                <CurrentTranscriptionView
                  containsChinglish={containsChinglish}
                  seekAndPlay={seekAndPlay}
                  currentTranscription={currentTranscription}
                  contentId={content.id}
                  lang={content.lang}
                />
              ) : (
                <div className=" dark:text-black text-white text-center mt-8 sm:mt-24 min-w-5xl mx-auto">
                  ...
                </div>
              )}
            </div>
          </div>
        )}

        <div className="fixed bottom-2 w-full">
          <div className="w-full max-w-3xl mx-auto p-4 py-2">
            <ReactPlayer
              key={content?.audio}
              playbackRate={playbackRate}
              progressInterval={100}
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

            <div className="flex items-center justify-center sm:gap-8 gap-4 bg-gray-50 dark:bg-black p-4 rounded-2xl shadow-sm mb-4">
              <ContentEditButton />
              <button
                className={cn(
                  "text-xl",
                  loop
                    ? "dark:text-white text-black font-bold"
                    : "dark:text-gray-600 text-gray-300"
                )}
                onClick={() => {
                  setLoop((loop: any) => {
                    if (loop) {
                      return null;
                    }

                    return currentTranscription;
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

              {/* <SearchOnlyPinyinButton className="text-2xl" /> */}

              <>
                <PinyinButton className="text-2xl" />
                {paragraphMode === "paragraph" ? null : (
                  <>
                    <EnButton className="text-2xl" />
                  </>
                )}
                <ReadModeButton className="text-2xl" />
                {containsChinglish && <ChinglishButton className="text-2xl" />}
              </>

              <PreviewButton />

              <ParagraphButton />
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
      </div>
    </MandoContextMenu>
  );
};
