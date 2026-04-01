import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useReadModeState } from "@/components/read-mode-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { SeriesContentDetails } from "@/domain/content-v2/series-content-details.types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useContentCharacterMenuBarStore } from "../hooks/use-content-character-menu-bar";
import { ReaderView } from "@/app/(auth)/convos/audiobook-player/components/reader-view";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

interface NormalizedTranscription {
  id: string;
  start: number;
  end: number;
  input: string;
  hanzi?: string;
  pinyin?: string;
  chinglish?: string;
  en?: string;
  roman?: string;
  lang: string;
}

export const ContentParagraphView = ({
  content,
  currentTranscription,
  currentTime,
  seek,
  isPlaying,
  transcriptions,
}: {
  currentTranscription: NormalizedTranscription | null;
  content: SeriesContentDetails;
  currentTime: number;
  isPlaying: boolean;
  seek: (time: number) => void;
  transcriptions: NormalizedTranscription[];
}) => {
  const showEn = useBrightModeStore((state) => state.showEn);
  const { setShowMenuBar } = useContentCharacterMenuBarStore();
  const active = 16;
  const { showChinglish, setShowChinglish } = useChinglishState();

  const group = useMemo(() => {
    return getActiveTranscriptions({
      limit: active,
      currentTime,
      transcriptions: transcriptions || [],
    });
  }, [active, currentTime, transcriptions]);

  const { readMode } = useReadModeState();

  return (
    <div className={cn("px-4 pb-24")}>
      <div className="sticky top-0 py-4 bg-gray-50 dark:bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <div
            className={cn(
              `flex justify-between items-center mt-2 w-full`,
              "h-32",
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
            <div className="text-sm sm:text-2xl gap-4">
              <div className="py-4 sm:space-y-8 space-y-2">
                {group?.map((transcription: NormalizedTranscription) => {
                  if (readMode && currentTranscription) {
                    return (
                      <ReaderView
                        key={JSON.stringify(transcription)}
                        currentTime={currentTime}
                        hideEnglish
                        currentTranscription={{
                          id: transcription.id,
                          start: transcription.start,
                          end: transcription.end,
                          input: transcription.input,
                          hanzi: transcription.hanzi || transcription.input,
                          pinyin: transcription.pinyin || "",
                          roman: transcription.roman || "",
                          chinglish: transcription.chinglish || "",
                          en: transcription.en || "",
                          lang: transcription.lang,
                        }}
                        containsChinglish={false}
                        className={cn(
                          isPlaying
                            ? transcription.start < currentTime &&
                              transcription.end > currentTime
                              ? "dark:text-white text-black dark:bg-[rgb(9,10,11)]"
                              : "!text-gray-500 opacity-50"
                            : "dark:text-white text-black",
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
                          : "dark:text-white text-black",
                      )}
                    >
                      {smartSplit({
                        input: transcription?.input,
                        lang: transcription?.lang,
                      })?.map((item: any, idx: any) => {
                        return (
                          <span
                            key={`${item}-content-view-${idx}`}
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
  );
};
