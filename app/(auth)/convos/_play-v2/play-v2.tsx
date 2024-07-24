// import { useMusic } from "@/components/music";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useMusic } from "../_play/use-music";
import { useMusicV2 } from "./use-music-v2";
import { Icons } from "@/components/ui/icons.v2";
import { formatTime } from "../_play/utils";
import { TranscriptItem } from "../_play/transcript-item";
import { Transcription } from "@/domain/transcribe/transcribe.types";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useViewType } from "./use-view-type";
import { cn } from "@/lib/utils";
import { GrammarAnalysis } from "@/components/grammar-analysis";
import { groupBy } from "ramda";

export const PlayV2 = ({ contentId }: { contentId: string }) => {
  const { data: content } = useGetContentQuery({ contentId });

  const audioUrl = content?.audio?.slow || content?.audio;
  const brightMode = useBrightModeStore((state: any) => state.mode);
  const view = useViewType((state: any) => state.view);
  const focus = useViewType((state: any) => state.focus);
  const setView = useViewType((state: any) => state.setView);
  const setFocus = useViewType((state: any) => state.setFocus);
  const displayGrammar = useViewType((state: any) => state.displayGrammar);
  const setDisplayGrammar = useViewType(
    (state: any) => state.setDisplayGrammar
  );
  const hanzi = useViewType((state: any) => state.hanzi);
  const setHanzi = useViewType((state: any) => state.setHanzi);

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: audioUrl,
  });

  const currentTranscription = content?.transcriptions?.find(
    (transcription: any) => {
      return (
        transcription.start < currentTime && transcription.end > currentTime
      );
    }
  );

  const sectionIdExits = content?.transcriptions?.every(
    (item: any) => item?.sectionId
  );

  const groupBySectionId = groupBy((item: any) => item.sectionId);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full mb-12">
        <h1 className="text-2xl leading-9">{content?.title}</h1>{" "}
        <div className="flex space-x-8">
          <div className="space-x-4">
            {view === "focus" ? (
              <button
                className="text-xl"
                onClick={() => {
                  setView("default");
                }}
              >
                <Icons.list />
              </button>
            ) : (
              <button
                className="text-xl"
                onClick={() => {
                  setView("focus");
                }}
              >
                <Icons.lightBulb />
              </button>
            )}

            {view === "focus" && (
              <button
                className="text-xl"
                onClick={() => {
                  setView("focus");
                  setFocus((focus: string) =>
                    focus === "hanzi" ? "en" : "hanzi"
                  );
                }}
              >
                <Icons.glassesRound />
              </button>
            )}
            <button
              className="text-xl"
              onClick={() => {
                setDisplayGrammar((prev: any) => !prev);
              }}
            >
              <Icons.analyze />
            </button>
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="space-x-4">
            <button
              className="text-2xl"
              onClick={() => {
                togglePlay();
              }}
            >
              {isPlaying ? <Icons.pause /> : <Icons.play />}
              {/* {isPlaying ? (
                <div>
                  <div className="flex space-x-1" aria-hidden="true">
                    <div className="w-1 h-4 bg-white animate-wave1"></div>
                    <div className="w-1 h-4 bg-white animate-wave2"></div>
                    <div className="w-1 h-4 bg-white animate-wave3"></div>
                  </div>
                </div>
              ) : (
                <Icons.play />
              )} */}
            </button>
            <button
              className="text-2xl"
              onClick={() => {
                reset();
              }}
            >
              <Icons.stop />
            </button>
          </div>
          <p className="w-16 font-extralight text-2xl text-center dark:text-slate-300 text-slate-600">
            {formatTime(currentTime)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-8">
          {view === "default" && (
            <div className="pt-12 space-y-12 mb-12">
              {content?.transcriptions?.map((transcription: Transcription) => {
                return (
                  <TranscriptItem
                    lang={content?.lang}
                    key={`${transcription?.hanzi || transcription?.input}-${transcription?.pinyin}`}
                    transcription={transcription}
                    seek={seek}
                    audioUrl={audioUrl}
                    currentTime={currentTime}
                    pinyinMode={brightMode}
                    lessonId={content?.id}
                  />
                );
              })}
            </div>
          )}
          {view === "focus" &&
            (sectionIdExits ? (
              <div>
                <div>
                  {Object.entries(
                    groupBySectionId(content?.transcriptions) as any
                  )?.map((val: any) => {
                    const transcriptions = val[1];
                    return (
                      <div key={JSON.stringify(val)}>
                        <div className="">
                          <div className="text-2xl gap-4">
                            <div className="p-8">
                              {transcriptions?.map(
                                (transcription: Transcription) => {
                                  return (
                                    <span
                                      key={JSON.stringify(transcription)}
                                      onClick={() => {
                                        seek(transcription?.start);
                                        setHanzi((prev: string) =>
                                          prev === transcription?.input
                                            ? ""
                                            : transcription?.input
                                        );
                                      }}
                                      className={cn(
                                        "text-center h-24",
                                        isPlaying
                                          ? transcription.start < currentTime &&
                                            transcription.end > currentTime
                                            ? "text-white"
                                            : transcription.end < currentTime
                                              ? "text-gray-600"
                                              : "text-gray-500"
                                          : "text-white"
                                      )}
                                    >
                                      {focus === "hanzi"
                                        ? transcription?.input ||
                                          transcription?.hanzi
                                        : transcription?.en}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div className="">
                  <div className="mb-12 text-2xl gap-4">
                    <div className="p-8">
                      {content?.transcriptions?.map(
                        (transcription: Transcription) => {
                          return (
                            <span
                              key={JSON.stringify(transcription)}
                              onClick={() => {
                                seek(transcription?.start);
                                setHanzi((prev: string) =>
                                  prev === transcription?.input
                                    ? ""
                                    : transcription?.input
                                );
                              }}
                              className={cn(
                                "text-center h-24",
                                !currentTime
                                  ? "text-white"
                                  : transcription.start < currentTime &&
                                      transcription.end > currentTime
                                    ? "text-white"
                                    : isPlaying
                                      ? transcription.start < currentTime &&
                                        transcription.end > currentTime
                                        ? "text-white"
                                        : transcription.end < currentTime
                                          ? "text-gray-600"
                                          : "text-gray-500"
                                      : currentTime
                                        ? transcription.end < currentTime
                                          ? "text-gray-600"
                                          : "text-gray-500"
                                        : "text-white"
                              )}
                            >
                              {focus === "hanzi"
                                ? transcription?.input || transcription?.hanzi
                                : transcription?.en}
                              {". "}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {displayGrammar && (
          <div className="w-full col-span-4">
            <GrammarAnalysis
              contentId={currentTranscription?.input || hanzi}
              showHeader={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
