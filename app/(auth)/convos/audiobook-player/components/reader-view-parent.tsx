import { EnglishTopView } from "@/app/(auth)/convos/audiobook-player/components/english-top-view";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useReadModeState } from "@/components/read-mode-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { cn } from "@/lib/utils";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useFontSizeStore } from "../hooks/use-font-size";
import { useGetGroupedTranscriptions } from "../hooks/use-get-grouped-transcriptions";
import { ReaderView } from "./reader-view";
import { containsUnknownStyles } from "../utils/contains-unknown-styles";

export const ReaderViewParent = ({
  loop,
  content,
  currentTranscription,
  currentTime,

  isPlaying,
}: {
  currentTranscription: ContentTranscription;
  content: IContent;
  currentTime: number;
  isPlaying: boolean;
  loop?: ContentTranscription;
}) => {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const { fontSize } = useFontSizeStore();

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const { setShowMenuBar } = useCharacterMenuBarStore();

  const group = useGetGroupedTranscriptions({
    groupBy: "length",
    loop,
    currentTime,
    content,
  });

  const { readMode } = useReadModeState();

  const isSmall = useIsSmall();

  const containsChinglish = !!content.transcriptions?.[0]?.chinglish;

  return (
    <div className={cn("px-4 pb-24", "max-w-4xl")}>
      <EnglishTopView currentTranscription={currentTranscription} />

      <div className="pb-32 sm:mt-16 mt-4">
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
                            transcription.start < currentTime &&
                              transcription.end > currentTime
                              ? "dark:text-white text-black dark:bg-[rgb(9,10,11)]"
                              : cn(`opacity-50`),
                            // : "dark:text-white text-black",
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
                            className={cn(
                              "text-sm font-extralight text-gray-500",
                            )}
                          >
                            {transcription.pinyin || transcription?.roman}
                          </p>
                        )}
                        <p
                          className={cn(
                            transcription.start < currentTime &&
                              transcription.end > currentTime
                              ? "dark:text-white text-black dark:bg-[rgb(9,10,11)]"
                              : cn(`opacity-50`),
                          )}
                        >
                          {smartSplit({
                            input: transcription?.input,
                            lang: transcription?.lang,
                          })?.map((item: any, idx: any) => {
                            const containsInUnknown =
                              contentUnknowns?.items?.find((val) => {
                                return isCharacterPartOfWordMatch(
                                  transcription?.input,
                                  val?.input,
                                  item,
                                  idx,
                                );
                              });
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
                                  className={cn(
                                    "sm:!text-3xl text-2xl",
                                    transcription.start < currentTime &&
                                      transcription.end > currentTime
                                      ? "   !dark:text-white"
                                      : "dark:text-gray-500",
                                    containsInUnknown &&
                                      containsUnknownStyles(
                                        !!containsInUnknown,
                                      ),
                                    "font-light",
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
