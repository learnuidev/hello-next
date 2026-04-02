import { EnglishTopView } from "@/app/(auth)/contents/[contentId]/components/english-top-view";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useReadModeState } from "@/components/read-mode-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useFontSizeStore } from "../hooks/use-font-size";
import { ActiveButtons } from "./active-buttons";
import { ReaderView } from "./reader-view";

export const ReaderViewParent = ({
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
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const { fontSize } = useFontSizeStore();

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const { setShowMenuBar } = useCharacterMenuBarStore();

  // const active = 16;
  const active = usePlayerViewModeStore((state) => state.active);

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
    <div className={cn("px-4 pb-24", "max-w-4xl")}>
      <EnglishTopView currentTranscription={currentTranscription}>
        <ActiveButtons />
      </EnglishTopView>

      <div className="pb-32">
        <div>
          <div>
            <div className="">
              <div className="text-sm sm:text-2xl gap-4">
                <div className="py-4 sm:space-y-4 space-y-2">
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
                      <div key={JSON.stringify(transcription)}>
                        {showPinyin && (
                          <p
                            style={{
                              fontSize: `${Math.max(Math.min(20, fontSize * 0.75), 12)}px`,
                            }}
                            className="font-extralight text-gray-500"
                          >
                            {transcription.pinyin || transcription?.roman}
                          </p>
                        )}
                        <p
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
                                  style={{
                                    fontSize: `${Math.min(42, fontSize * 1.75)}px`,
                                  }}
                                  className={cn(
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
                      </div>
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
