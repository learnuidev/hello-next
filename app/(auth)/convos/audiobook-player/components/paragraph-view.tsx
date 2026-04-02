import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useReadModeState } from "@/components/read-mode-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { ReaderView } from "./reader-view";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

export const ParagraphView = ({
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
  const showEn = useBrightModeStore((state) => state.showEn);

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const { setShowMenuBar } = useCharacterMenuBarStore();

  const active = 8;

  const { showChinglish, setShowChinglish } = useChinglishState();

  const group = useMemo(() => {
    return getActiveTranscriptions({
      limit: active,
      currentTime,
      transcriptions: content?.transcriptions || [],
    });
  }, [active, currentTime, content?.transcriptions]);

  const { readMode } = useReadModeState();

  return (
    <div className={cn("px-4 pb-24")}>
      <div className="sticky top-0 py-4 bg-gray-50 dark:bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <div
            className={cn(
              `flex justify-between items-center mt-2 w-full`,
              "h-32"
            )}
          >
            <p className="space-x-2 font-extralight pb-[4px] overflow sm:text-xl text-sm">
              {showEn
                ? showChinglish
                  ? currentTranscription?.chinglish || currentTranscription?.en
                  : currentTranscription?.en
                : null}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-32">
        <div>
          <div>
            <div className="">
              <div className="text-sm sm:text-2xl gap-4">
                <div className="py-4 sm:space-y-8 space-y-2">
                  {group?.map((transcription: ContentTranscription) => {
                    if (readMode) {
                      return (
                        <ReaderView
                          key={JSON.stringify(transcription)}
                          currentTime={currentTime}
                          hideEnglish
                          currentTranscription={transcription}
                          containsChinglish={false}
                          className={cn(
                            isPlaying
                              ? transcription.start < currentTime &&
                                transcription.end > currentTime
                                ? "dark:text-white text-black dark:bg-[rgb(9,10,11)]"
                                : "!text-gray-500 opacity-50"
                              : "dark:text-white text-black"
                          )}
                          contentId={content?.id}
                          lang={content?.lang}
                        />
                      );
                    }

                    return (
                      <p
                        key={JSON.stringify(transcription)}
                        onClick={() => {
                          seek(transcription?.start);
                        }}
                        className={cn(
                          isPlaying
                            ? transcription.start < currentTime &&
                              transcription.end > currentTime
                              ? "dark:text-white text-black dark:bg-[rgb(9,10,11)]"
                              : "!text-gray-500 opacity-50"
                            : "dark:text-white text-black"
                        )}
                      >
                        {smartSplit({
                          input: transcription?.input,
                          lang: transcription?.lang,
                        })?.map((item: any, idx: any) => {
                          const containsInUnknown =
                            contentUnknowns?.items?.find((val) =>
                              val?.input?.includes(item)
                            );
                          return (
                            <span
                              key={`${item}-pinin-view-${idx}`}
                              className="py-2 sm:leading-relaxed leading-loose"
                              onClick={(e) => {
                                e.stopPropagation();
                                const selectedText = getSelectedText();

                                const text =
                                  selectedText && selectedText?.length < 36
                                    ? selectedText
                                    : item;

                                setShowMenuBar({
                                  text,
                                  position: {
                                    x: e.clientX,
                                    y: e.clientY,
                                  },
                                  startTime: transcription?.start ?? null,
                                });
                              }}
                            >
                              <CharacterItem
                                className={cn(
                                  "text-lg sm:text-2xl",
                                  isPlaying
                                    ? transcription.start < currentTime &&
                                      transcription.end > currentTime
                                      ? "   !dark:text-white"
                                      : "dark:text-gray-500"
                                    : "",

                                  containsInUnknown &&
                                    "font-light dark:!text-pink-300 !text-pink-500"
                                )}
                                character={item}
                              />
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
