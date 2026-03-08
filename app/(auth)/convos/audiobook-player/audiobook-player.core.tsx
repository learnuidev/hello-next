import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";

import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { ChinglishButton } from "@/components/chinglish-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";
import { SearchOnlyPinyinButton } from "@/components/search-only-pinyin-button";
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
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { splitEvery } from "ramda";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { CurrentTranscriptionEditor } from "./components/current-transcription-editor";
import { CurrentTranscriptionView } from "./components/current-transcription-view";
import { MiniDictionary } from "./components/mini-dictionary";
import { useAudioBookState } from "./hooks/use-audiobook-state";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { CharacterItem } from "@/components/_select-character/character-item";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";

const ParagraphView = ({
  content,
  currentTranscription,
  currentTime,
  seek,
  isPlaying,
}: {
  currentTranscription: ContentTranscription;
  content: IContent;
  currentTime: number;
  isPlaying: boolean;
  seek: (time: number) => void;
}) => {
  const { selected, setSelected } = useSelectedItem();

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  return (
    <div className={cn("px-4 pb-24", selected ? "" : "lg:px-48")}>
      <div className="sticky top-0 pt-4 pb-[4px] bg-gray-50 dark:bg-[rgb(9,10,11)] px-4">
        <div className="pb-4">
          <div
            className={cn(
              `flex justify-between items-center mt-2 w-full`,
              "h-32"
            )}
          >
            <p className="space-x-2 font-extralight pb-[4px] overflow text-[20px]">
              {currentTranscription?.en}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div>
          {Object.entries(splitEvery(5, content?.transcriptions) as any)?.map(
            (val: any) => {
              const transcriptions = val[1];
              return (
                <div key={JSON.stringify(val)}>
                  <div className="">
                    <div className="text-2xl gap-4">
                      <div className="py-4">
                        {transcriptions?.map(
                          (transcription: ContentTranscription) => {
                            return (
                              <span
                                key={JSON.stringify(transcription)}
                                onClick={() => {
                                  seek(transcription?.start);
                                }}
                                className={cn(
                                  "text-center h-24",
                                  isPlaying
                                    ? transcription.start < currentTime &&
                                      transcription.end > currentTime
                                      ? "dark:text-white text-black bg-yellow-200 dark:bg-black"
                                      : "text-gray-500"
                                    : "dark:text-white text-black"
                                )}
                              >
                                {smartSplit({
                                  input: transcription?.input,
                                  lang: transcription?.lang,
                                })?.map((item: any, idx: any) => {
                                  console.log("ITEM", item);
                                  const containsInUnknown =
                                    contentUnknowns?.items?.find((val) =>
                                      val?.input?.includes(item)
                                    );
                                  return (
                                    <span key={`${item}-pinin-view-${idx}`}>
                                      <CharacterItem
                                        className={cn(
                                          isPlaying
                                            ? transcription.start <
                                                currentTime &&
                                              transcription.end > currentTime
                                              ? " bg-red-200 dark:bg-red-500"
                                              : ""
                                            : "",

                                          containsInUnknown &&
                                            "font-light dark:!text-pink-300 !text-pink-500"
                                        )}
                                        character={item}
                                        onClick={() => {
                                          const selectedText =
                                            getSelectedText();

                                          if (
                                            selectedText &&
                                            selectedText?.length < 36
                                          ) {
                                            setSelected(selectedText);
                                          } else {
                                            setSelected(item);
                                          }
                                        }}
                                      />
                                    </span>
                                  );
                                })}

                                {/* {transcription?.input || transcription?.hanzi} */}
                              </span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export const AudiobookPlayerCore = ({ content }: { content: IContent }) => {
  const {
    seekAndPlay,
    selected,
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
      <div className="relative">
        <div
          className={cn("grid grid-cols-12 gap-8 sm:px-8 scroll-px-80 w-full")}
        >
          <div
            className={cn(
              selected ? "md:col-span-8 col-span-12" : "col-span-12"
            )}
          >
            {editMode && currentTranscription ? (
              <CurrentTranscriptionEditor
                currentTranscription={currentTranscription}
                contentId={content.id}
              />
            ) : paragraphMode ? (
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

          {selected && (
            <div
              className={cn(
                "w-full",
                selected ? " md:col-span-4 col-span-12" : "col-span-12"
              )}
            >
              <MiniDictionary
                contentId={content?.id}
                selected={selected}
                lang={content?.lang}
              />
            </div>
          )}
        </div>

        <div className="fixed bottom-2 w-full">
          <div className="w-full max-w-3xl mx-auto p-4 py-2">
            <ReactPlayer
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

              <SearchOnlyPinyinButton className="text-2xl" />
              <PinyinButton className="text-2xl" />

              <ReadModeButton className="text-2xl" />

              {containsChinglish && <ChinglishButton className="text-2xl" />}
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
